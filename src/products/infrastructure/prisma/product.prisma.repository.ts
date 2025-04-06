import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Product } from 'src/products/domain/entities/product.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';
import { deleteUploadedFile } from 'src/common/helpers/delete-uploaded-file.helper';
import { Prisma } from '@prisma/client';
import { PRODUCT_PATH } from 'src/common/constants/paths';

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async create(product: Product): Promise<Product> {
    try {
      const created = await this.prisma.product.create({
        data: {
          name: product.name,
          productTypeId: product.productTypeId,
          regionId: product.regionId,
          description: product.description,
          price: product.price,
          image: product.image,
          status: product.status,
        },
      });

      return new Product(
        created.id,
        created.name,
        created.productTypeId,
        created.regionId,
        created.description,
        created.price.toNumber(),
        created.status,
        created.createdAt,
        created.updatedAt,
        created.image,
      );
    } catch (error) {
      this.logger.error('Error creating product', error.stack);
      throw new InternalServerErrorException('Error creating product');
    }
  }

  async getAll(): Promise<Product[]> {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          productType: true,
          region: true,
        },
        orderBy: { createdAt: 'asc' },
      });
      return products.map(
        (product) =>
          new Product(
            product.id,
            product.name,
            product.productTypeId,
            product.regionId,
            product.description,
            product.price.toNumber(),
            product.status,
            product.createdAt,
            product.updatedAt,
            product.image,
            product.productType?.name,
            product.region?.name,
          ),
      );
    } catch (error) {
      this.logger.error('Error getting all products', error.stack);
      throw new InternalServerErrorException('Error getting all products');
    }
  }

  async getById(id: number): Promise<Product | null> {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          productType: true,
          region: true,
        },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return new Product(
        product.id,
        product.name,
        product.productTypeId,
        product.regionId,
        product.description,
        product.price.toNumber(),
        product.status,
        product.createdAt,
        product.updatedAt,
        product.image,
        product.productType?.name,
        product.region?.name,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Con esto no sobreescribimos el error en caso de ser NotFoundException
      }
      this.logger.error(`Error getting product ${id}`, error.stack);
      throw new InternalServerErrorException(`Error getting product ${id}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      const current = await this.prisma.product.findUnique({
        where: { id: product.id },
      });

      if (!current) {
        throw new Error(`Product with ID ${product.id} not found`);
      }

      if (product.image && current.image && current.image !== product.image) {
        deleteUploadedFile(`${PRODUCT_PATH}/${current.image}`);
      }

      const updated = await this.prisma.product.update({
        where: { id: product.id },
        data: {
          name: product.name,
          description: product.description,
          price: new Prisma.Decimal(product.price),
          productTypeId: product.productTypeId,
          regionId: product.regionId,
          image: product.image,
          status: product.status,
        },
        include: {
          productType: true,
          region: true,
        },
      });

      return new Product(
        updated.id,
        updated.name,
        updated.productTypeId,
        updated.regionId,
        updated.description,
        updated.price.toNumber(),
        updated.status,
        updated.createdAt,
        updated.updatedAt,
        updated.image,
        updated.productType?.name,
        updated.region?.name,
      );
    } catch (error) {
      this.logger.error('Error updating product', error.stack);
      throw new InternalServerErrorException('Error updating product');
    }
  }

  async updateStatus(id: number, status: boolean): Promise<Product> {
    try {
      throw new Error('Method not implemented.');
    } catch (error) {
      this.logger.error('Error updating product status', error.stack);
      throw new InternalServerErrorException('Error updating product status');
    }
  }
}
