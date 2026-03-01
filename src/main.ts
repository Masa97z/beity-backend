// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // إعدادات CORS (مهمة لاحقاً عند ربط الفرونت اند)
  app.enableCors();

  // ===========================================
  // إعدادات Swagger (OpenAPI)
  // ===========================================
  const config = new DocumentBuilder()
    .setTitle('Beity System API - نظام بيتي')
    .setDescription('The official API documentation for Beity System (SaaS Home Management)')
    .setVersion('1.0')
    .addBearerAuth() // لإضافة زر إدخال التوكن (JWT) لاحقاً
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // تحديد المسار الذي ستعمل عليه واجهة سواغر (مثلاً: /api-docs)
  SwaggerModule.setup('api', app, document);
  // ===========================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // يمنع إرسال أي بيانات غير موجودة في الـ DTO
    }),
  );
  // تشغيل السيرفر على البورت 3000
  await app.listen(3000);
  console.log(`Application is running on: await app.getUrl()`);
  console.log(`Swagger UI is running on: http://localhost:3000/api`);
}
bootstrap();