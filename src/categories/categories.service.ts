import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // دالة مساعدة للتحقق من انتماء المستخدم للعائلة
  private async checkFamilyMembership(familyId: string, userId: string) {
    const membership = await this.prisma.familyMember.findUnique({
      where: {
        familyId_userId: {
          familyId: familyId,
          userId: userId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('غير مصرح لك بالوصول إلى بيانات هذه العائلة');
    }
    return membership;
  }

  async create(userId: string, dto: CreateCategoryDto) {
    // 1. التحقق من الصلاحيات
    await this.checkFamilyMembership(dto.familyId, userId);

    // 2. إنشاء القسم
    return this.prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description,
        familyId: dto.familyId,
        createdById: userId, // تسجيل من قام بإنشاء القسم
      },
    });
  }

  async findAllByFamily(userId: string, familyId: string) {
    // 1. التحقق من الصلاحيات
    await this.checkFamilyMembership(familyId, userId);

    // 2. جلب الأقسام
    return this.prisma.category.findMany({
      where: { familyId: familyId },
      orderBy: { createdAt: 'desc' }, // ترتيب من الأحدث للأقدم
    });
  }
}