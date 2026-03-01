import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFamilyDto } from './dto/create-family.dto';

@Injectable()
export class FamiliesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateFamilyDto) {
    // نستخدم transaction لضمان إنشاء العائلة وإضافة المستخدم كمالك في نفس الوقت
    return this.prisma.$transaction(async (prisma) => {
      // 1. إنشاء العائلة
      const family = await prisma.family.create({
        data: {
          name: dto.name,
          currency: dto.currency || 'USD',
          ownerId: userId,
        },
      });

      // 2. إضافة المستخدم الحالي كمالك (OWNER) للعائلة
      await prisma.familyMember.create({
        data: {
          familyId: family.id,
          userId: userId,
          role: 'OWNER',
        },
      });

      return family;
    });
  }

  async findAllForUser(userId: string) {
    // جلب جميع العوائل التي ينتمي إليها المستخدم (سواء كان مالكاً أو عضواً)
    return this.prisma.family.findMany({
      where: {
        members: {
          some: { userId: userId },
        },
      },
      include: {
        // لجلب بيانات الأعضاء وعددهم إذا أردت
        _count: { select: { members: true } },
      },
    });
  }
}