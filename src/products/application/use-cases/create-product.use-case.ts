import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductTypeRepository } from 'src/product-types/domain/ports/product-type.repository';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';
import { CreateProductDto } from 'src/products/interfaces/dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('ProductTypeRepository')
    private readonly productTypeRepository: ProductTypeRepository,

    @Inject('RegionRepository')
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const existsProductType = await this.productTypeRepository.exists(
      dto.product_type_id,
    );
    if (!existsProductType) {
      throw new BadRequestException('The product type does not exist');
    }

    const existsRegion = await this.regionRepository.exists(dto.region_id);
    if (!existsRegion) {
      throw new BadRequestException('The region does not exist');
    }

    const now = new Date();

    const product = new Product(
      0,
      dto.name,
      dto.product_type_id,
      dto.region_id,
      dto.description,
      dto.price,
      dto.status ?? true,
      now,
      now,
      dto.image ?? null,
    );

    return this.productRepository.create(product);
  }
}
