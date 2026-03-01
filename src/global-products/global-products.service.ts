import { Injectable } from '@nestjs/common';
import { CreateGlobalProductDto } from './dto/create-global-product.dto';
import { UpdateGlobalProductDto } from './dto/update-global-product.dto';

@Injectable()
export class GlobalProductsService {
  create(createGlobalProductDto: CreateGlobalProductDto) {
    return 'This action adds a new globalProduct';
  }

  findAll() {
    return `This action returns all globalProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalProduct`;
  }

  update(id: number, updateGlobalProductDto: UpdateGlobalProductDto) {
    return `This action updates a #${id} globalProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalProduct`;
  }
}
