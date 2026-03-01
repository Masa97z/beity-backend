import { Module } from '@nestjs/common';
import { GlobalProductsService } from './global-products.service';
import { GlobalProductsController } from './global-products.controller';

@Module({
  controllers: [GlobalProductsController],
  providers: [GlobalProductsService],
})
export class GlobalProductsModule {}
