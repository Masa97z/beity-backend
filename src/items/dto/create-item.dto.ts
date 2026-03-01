import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { AlertType } from '@prisma/client'; // استيراد نوع التنبيه من Prisma

export class CreateItemDto {
  @ApiProperty({ description: 'معرف العائلة' })
  @IsUUID()
  @IsNotEmpty()
  familyId: string;

  @ApiProperty({ description: 'معرف القسم (مثل: الثلاجة)' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'حليب طازج' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'المراعي', required: false })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({ example: 2, description: 'الكمية الحالية' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 'لتر' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ example: 1, description: 'الكمية التي يتم التنبيه عند الوصول إليها', required: false })
  @IsNumber()
  @IsOptional()
  minQuantityAlert?: number;

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z', required: false })
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ enum: AlertType, required: false })
  @IsEnum(AlertType)
  @IsOptional()
  alertType?: AlertType;
}