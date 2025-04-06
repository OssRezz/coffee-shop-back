import { Inject, Injectable } from '@nestjs/common';
import { ProductTypeRepository } from 'src/product-types/domain/ports/product-type.repository';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';

@Injectable()
export class GetAllProductTypeUseCase {
  constructor(
    @Inject('ProductTypeRepository')
    private readonly productTypeRepository: ProductTypeRepository,
  ) {}
  async execute(): Promise<ProductType[]> {
    return this.productTypeRepository.getAll();
  }
}
