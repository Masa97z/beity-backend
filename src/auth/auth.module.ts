import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // استيراد الـ Prisma
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    PrismaModule, // لكي يستطيع AuthService التحدث مع قاعدة البيانات
    JwtModule.register({
      global: true, // يجعله متاحاً في كل التطبيق لتسهيل حماية المسارات لاحقاً
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }, // التوكن تنتهي صلاحيته بعد 7 أيام
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}