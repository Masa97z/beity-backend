import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. التحقق مما إذا كان الإيميل مسجلاً مسبقاً
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('البريد الإلكتروني مسجل بالفعل');
    }

    // 2. تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. حفظ المستخدم في قاعدة البيانات
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash: hashedPassword,
      },
    });

    // 4. إنشاء الـ Token وإرجاعه
    return this.generateToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    // 1. البحث عن المستخدم
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    // 2. مقارنة كلمة المرور
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    // 3. تحديث آخر ظهور للمستخدم (اختياري لكنه مفيد)
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // 4. إرجاع التوكن
    return this.generateToken(user.id, user.email);
  }

  // دالة مساعدة لإنشاء الـ JWT
  private generateToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}