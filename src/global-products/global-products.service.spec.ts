import { Test, TestingModule } from '@nestjs/testing';
import { GlobalProductsService } from './global-products.service';

describe('GlobalProductsService', () => {
  let service: GlobalProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalProductsService],
    }).compile();

    service = module.get<GlobalProductsService>(GlobalProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
