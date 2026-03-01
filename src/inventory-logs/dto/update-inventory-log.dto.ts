import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { InventoryAction } from '@prisma/client';

export class UpdateInventoryDto {
  @ApiProperty({ enum: InventoryAction, description: 'نوع الحركة: ADD (إضافة) أو REDUCE (سحب) أو EDIT (تعديل مباشر)' })
  @IsEnum(InventoryAction)
  @IsNotEmpty()
  action: InventoryAction;

  @ApiProperty({ example: 1, description: 'الكمية المراد إضافتها أو سحبها' })
  @IsNumber()
  @Min(0.1) // لا يمكن أن تكون الحركة بصفر أو بالسالب
  @IsNotEmpty()
  amount: number;
}