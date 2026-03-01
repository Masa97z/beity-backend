import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('الأقسام (Categories)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'إنشاء قسم جديد داخل عائلة' })
  create(@Req() req, @Body() createCategoryDto: CreateCategoryDto) {
    const userId = req.user.userId;
    return this.categoriesService.create(userId, createCategoryDto);
  }

  @Get('family/:familyId')
  @ApiOperation({ summary: 'عرض جميع أقسام عائلة محددة' })
  @ApiParam({ name: 'familyId', description: 'معرف العائلة' })
  findAllByFamily(@Req() req, @Param('familyId') familyId: string) {
    const userId = req.user.userId;
    return this.categoriesService.findAllByFamily(userId, familyId);
  }
}