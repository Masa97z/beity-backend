import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateItemDto) {
    // 1. التحقق من أن المستخدم عضو في العائلة
    const membership = await this.prisma.familyMember.findUnique({
      where: {
        familyId_userId: { familyId: dto.familyId, userId: userId },
      },
    });

    if (!membership) {
      throw new ForbiddenException('غير مصرح لك بإضافة عناصر لهذه العائلة');
    }

    // 2. التحقق من أن القسم (Category) موجود فعلاً وينتمي لنفس العائلة
    const category = await this.prisma.category.findFirst({
      where: { id: dto.categoryId, familyId: dto.familyId },
    });

    if (!category) {
      throw new BadRequestException('القسم المحدد غير موجود أو لا ينتمي لهذه العائلة');
    }

    // 3. إضافة العنصر في قاعدة البيانات
    return this.prisma.item.create({
      data: {
        familyId: dto.familyId,
        categoryId: dto.categoryId,
        name: dto.name,
        brand: dto.brand,
        quantity: dto.quantity,
        unit: dto.unit,
        minQuantityAlert: dto.minQuantityAlert,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        alertType: dto.alertType,
        createdById: userId,
      },
    });
  }

  async findAllByFamily(userId: string, familyId: string) {
    // التحقق من الصلاحيات قبل عرض العناصر
    const membership = await this.prisma.familyMember.findUnique({
      where: { familyId_userId: { familyId, userId } },
    });

    if (!membership) throw new ForbiddenException('غير مصرح لك برؤية عناصر هذه العائلة');

    return this.prisma.item.findMany({
      where: { familyId, deletedAt: null }, // لا نجلب العناصر المحذوفة (Soft Delete)
      include: {
        category: { select: { name: true } }, // نجلب اسم القسم مع العنصر لتسهيل العرض
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}