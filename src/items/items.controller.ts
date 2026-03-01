import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('العناصر والمقاضي (Items)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiOperation({ summary: 'إضافة عنصر جديد للمخزون' })
  create(@Req() req, @Body() createItemDto: CreateItemDto) {
    const userId = req.user.userId;
    return this.itemsService.create(userId, createItemDto);
  }

  @Get('family/:familyId')
  @ApiOperation({ summary: 'عرض جميع عناصر عائلة محددة' })
  @ApiParam({ name: 'familyId', description: 'معرف العائلة' })
  findAllByFamily(@Req() req, @Param('familyId') familyId: string) {
    const userId = req.user.userId;
    return this.itemsService.findAllByFamily(userId, familyId);
  }
}