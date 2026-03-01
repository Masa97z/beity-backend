import { Test, TestingModule } from '@nestjs/testing';
import { GlobalProductsController } from './global-products.controller';
import { GlobalProductsService } from './global-products.service';

describe('GlobalProductsController', () => {
  let controller: GlobalProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalProductsController],
      providers: [GlobalProductsService],
    }).compile();

    controller = module.get<GlobalProductsController>(GlobalProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
