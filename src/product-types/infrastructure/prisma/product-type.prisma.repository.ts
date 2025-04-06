import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTypeRepository } from 'src/product-types/domain/ports/product-type.repository';
import { ProductType } from 'src/product-types/domain/entities/product-type.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class ProductTypePrismaRepository implements ProductTypeRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(name: string): Promise<ProductType> {
    try {
      const productType = await this.prisma.productType.create({
        data: { name },
      });
      return new ProductType(productType.id, productType.name);
    } catch (error) {
      this.logger.error('Error creating product type', error.stack);
      throw new InternalServerErrorException('Error creating product type');
    }
  }

  async getAll(): Promise<ProductType[]> {
    try {
      const productTypes = await this.prisma.productType.findMany();
      return productTypes.map(
        (productType) => new ProductType(productType.id, productType.name),
      );
    } catch (error) {
      this.logger.error('Error getting all product types', error.stack);
      throw new InternalServerErrorException('Error getting al product types');
    }
  }

  async getById(id: number): Promise<ProductType | null> {
    try {
      const productType = await this.prisma.productType.findUnique({
        where: { id },
      });
      if (!productType) {
        this.logger.warn(`Product type with ID ${id} not found`);
        throw new NotFoundException(`Product type with ID ${id} not found`);
      }
      return new ProductType(productType.id, productType.name);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Con esto no sobreescribimos el error en caso de ser NotFoundException
      }
      this.logger.error(`Error getting Product type ${id}`, error.stack);
      throw new InternalServerErrorException(
        `Error getting Product type ${id}`,
      );
    }
  }

  async exists(id: number): Promise<boolean> {
    const found = await this.prisma.productType.findUnique({
      where: { id },
      select: { id: true }, // más eficiente
    });

    return !!found;
  }
}
