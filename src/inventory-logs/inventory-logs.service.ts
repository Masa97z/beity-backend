import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateInventoryDto } from './dto/update-inventory-log.dto';
import { InventoryAction } from '@prisma/client';

@Injectable()
export class InventoryLogsService {
  constructor(private prisma: PrismaService) {}

  async updateItemQuantity(userId: string, itemId: string, dto: UpdateInventoryDto) {
    // 1. جلب العنصر للتحقق من وجوده ومعرفة الكمية الحالية
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundException('العنصر غير موجود');

    // 2. التحقق من صلاحيات المستخدم (هل ينتمي لعائلة هذا العنصر؟)
    const membership = await this.prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId: item.familyId, userId: userId } },
    });

    if (!membership) throw new ForbiddenException('غير مصرح لك بتعديل هذا العنصر');

    // 3. حساب الكمية الجديدة بناءً على نوع الحركة
    let newQuantity = item.quantity;
    if (dto.action === InventoryAction.ADD) {
      newQuantity += dto.amount;
    } else if (dto.action === InventoryAction.REDUCE) {
      if (item.quantity < dto.amount) throw new BadRequestException('الكمية الحالية لا تكفي لعملية السحب!');
      newQuantity -= dto.amount;
    } else if (dto.action === InventoryAction.EDIT) {
      newQuantity = dto.amount; // في حالة التعديل المباشر، المبلغ المرسل هو الكمية النهائية
    }

    // 4. استخدام Transaction لتحديث الكمية وإنشاء السجل في نفس اللحظة
    return this.prisma.$transaction(async (prisma) => {
      // أ. تحديث العنصر
      const updatedItem = await prisma.item.update({
        where: { id: itemId },
        data: { quantity: newQuantity },
      });

      // ب. إنشاء سجل الحركة
      const log = await prisma.inventoryLog.create({
        data: {
          itemId: itemId,
          action: dto.action,
          quantityBefore: item.quantity,
          quantityAfter: newQuantity,
          performedById: userId,
        },
      });

      return { updatedItem, log };
    });
  }

  async getItemLogs(userId: string, itemId: string) {
    // جلب العنصر للتحقق من الصلاحيات أولاً
    const item = await this.prisma.item.findUnique({ where: { id: itemId } });
    if (!item) throw new NotFoundException('العنصر غير موجود');

    const membership = await this.prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId: item.familyId, userId: userId } },
    });
    if (!membership) throw new ForbiddenException('غير مصرح لك برؤية سجل هذا العنصر');

    // إرجاع السجل مرتباً من الأحدث للأقدم مع بيانات من قام بالحركة
    return this.prisma.inventoryLog.findMany({
      where: { itemId },
      orderBy: { createdAt: 'desc' },
      include: {
        performedBy: { select: { name: true } }, // جلب اسم الشخص الذي قام بالسحب/الإضافة
      },
    });
  }
}