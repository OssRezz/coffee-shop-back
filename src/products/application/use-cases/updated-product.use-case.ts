import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';
import { UpdateProductDto } from 'src/products/interfaces/dto/update-product.dto';
import { ProductTypeRepository } from 'src/product-types/domain/ports/product-type.repository';
import { RegionRepository } from 'src/regions/domain/ports/region.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('ProductTypeRepository')
    private readonly productTypeRepository: ProductTypeRepository,

    @Inject('RegionRepository')
    private readonly regionRepository: RegionRepository,
  ) {}

  async execute(id: number, dto: UpdateProductDto): Promise<Product> {
    const existing = await this.productRepository.getById(id);
    if (!existing) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

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

    const updatedProduct = new Product(
      id,
      dto.name,
      dto.product_type_id,
      dto.region_id,
      dto.description,
      dto.price,
      dto.status,
      existing.createdAt,
      new Date(),
      dto.image ?? existing.image,
    );

    return this.productRepository.update(updatedProduct);
  }
}
