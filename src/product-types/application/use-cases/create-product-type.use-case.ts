import { Inject, Injectable } from '@nestjs/common';
import { ProductTypeRepository } from 'src/product-types/domain/ports/product-type.repository';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';

@Injectable()
export class CreateProductTypeUseCase {
  constructor(
    @Inject('ProductTypeRepository')
    private readonly productTypeRepository: ProductTypeRepository,
  ) {}

  async execute(name: string): Promise<ProductType> {
    return this.productTypeRepository.create(name);
  }
}
