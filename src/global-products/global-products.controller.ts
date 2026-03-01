import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalProductsService } from './global-products.service';
import { CreateGlobalProductDto } from './dto/create-global-product.dto';
import { UpdateGlobalProductDto } from './dto/update-global-product.dto';

@Controller('global-products')
export class GlobalProductsController {
  constructor(private readonly globalProductsService: GlobalProductsService) {}

  @Post()
  create(@Body() createGlobalProductDto: CreateGlobalProductDto) {
    return this.globalProductsService.create(createGlobalProductDto);
  }

  @Get()
  findAll() {
    return this.globalProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalProductDto: UpdateGlobalProductDto) {
    return this.globalProductsService.update(+id, updateGlobalProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalProductsService.remove(+id);
  }
}
