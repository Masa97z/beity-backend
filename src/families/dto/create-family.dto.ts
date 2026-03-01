import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFamilyDto {
  @ApiProperty({ example: 'عائلة عبدالله' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'IQD', description: 'عملة العائلة الافتراضية', required: false })
  @IsString()
  @IsOptional()
  currency?: string;
}