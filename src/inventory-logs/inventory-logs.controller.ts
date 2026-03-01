import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { InventoryLogsService } from './inventory-logs.service';
import { UpdateInventoryDto } from './dto/update-inventory-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('سجل المخزون (Inventory Logs)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('inventory') // قمنا بتقصير اسم المسار ليكون أجمل
export class InventoryLogsController {
  constructor(private readonly inventoryLogsService: InventoryLogsService) {}

  @Post('item/:itemId')
  @ApiOperation({ summary: 'إضافة/سحب كمية من عنصر وتسجيل الحركة تلقائياً' })
  @ApiParam({ name: 'itemId', description: 'معرف العنصر' })
  updateQuantity(
    @Req() req,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateInventoryDto,
  ) {
    const userId = req.user.userId;
    return this.inventoryLogsService.updateItemQuantity(userId, itemId, dto);
  }

  @Get('item/:itemId/logs')
  @ApiOperation({ summary: 'عرض سجل حركات الإضافة والسحب لعنصر محدد' })
  @ApiParam({ name: 'itemId', description: 'معرف العنصر' })
  getItemLogs(@Req() req, @Param('itemId') itemId: string) {
    const userId = req.user.userId;
    return this.inventoryLogsService.getItemLogs(userId, itemId);
  }
}