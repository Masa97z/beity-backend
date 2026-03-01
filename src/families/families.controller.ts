import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('العوائل (Families)')
@ApiBearerAuth() // يخبر Swagger أن كل مسارات العوائل تحتاج إلى توكن
@UseGuards(JwtAuthGuard) // حماية جميع المسارات في هذا الكنترولر دفعة واحدة
@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  @ApiOperation({ summary: 'إنشاء عائلة جديدة' })
  create(@Req() req, @Body() createFamilyDto: CreateFamilyDto) {
    // نأخذ userId من التوكن الذي تم التحقق منه
    const userId = req.user.userId;
    return this.familiesService.create(userId, createFamilyDto);
  }

  @Get()
  @ApiOperation({ summary: 'عرض جميع العوائل التي ينتمي إليها المستخدم' })
  findAll(@Req() req) {
    const userId = req.user.userId;
    return this.familiesService.findAllForUser(userId);
  }
}