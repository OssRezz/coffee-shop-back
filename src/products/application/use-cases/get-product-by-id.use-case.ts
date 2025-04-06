import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}
  async execute(id: number): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }
}
