import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';

@Injectable()
export class GetAllProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }
}
