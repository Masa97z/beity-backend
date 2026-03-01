import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'الثلاجة' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'معرف العائلة' })
  @IsUUID()
  @IsNotEmpty()
  familyId: string; // يجب إرسال معرف العائلة لنعرف أين سنضيف هذا القسم

  @ApiProperty({ example: 'قسم يحتوي على الألبان والأجبان', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}