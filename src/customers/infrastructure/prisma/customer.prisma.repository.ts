import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerRepository } from 'src/customers/domain/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { WinstonLogger } from 'src/common/logger/winston-logger.service';

@Injectable()
export class CustomerPrismaRepository implements CustomerRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: WinstonLogger,
  ) {}

  async getAll(): Promise<Customer[]> {
    try {
      const customers = await this.prisma.customer.findMany({
        orderBy: { name: 'asc' },
      });

      return customers.map(
        (c) =>
          new Customer(c.id, c.documentNumber, c.name, c.email, c.cellphone),
      );
    } catch (error) {
      this.logger.error('Error fetching customers', error.stack);
      throw new InternalServerErrorException('Error fetching customers');
    }
  }

  async create(data: {
    documentNumber: string;
    name: string;
    email: string;
    cellphone: string;
  }): Promise<Customer> {
    try {
      const created = await this.prisma.customer.create({
        data: {
          documentNumber: data.documentNumber,
          name: data.name,
          email: data.email,
          cellphone: data.cellphone,
        },
      });

      return new Customer(
        created.id,
        created.documentNumber,
        created.name,
        created.email,
        created.cellphone,
      );
    } catch (error) {
      this.logger.error('Error creating customer', error.stack);
      throw new InternalServerErrorException('Error creating customer');
    }
  }

  async findByDocumentNumber(documentNumber: string): Promise<Customer | null> {
    try {
      const found = await this.prisma.customer.findUnique({
        where: { documentNumber },
      });

      if (!found) return null;

      return new Customer(
        found.id,
        found.documentNumber,
        found.name,
        found.email,
        found.cellphone,
      );
    } catch (error) {
      this.logger.error('Error fetching customer by document', error.stack);
      throw new InternalServerErrorException(
        'Error fetching customer by document',
      );
    }
  }

  async findByEmail(email: string): Promise<Customer | null> {
    try {
      const found = await this.prisma.customer.findUnique({
        where: { email },
      });

      if (!found) return null;

      return new Customer(
        found.id,
        found.documentNumber,
        found.name,
        found.email,
        found.cellphone,
      );
    } catch (error) {
      this.logger.error('Error fetching customer by email', error.stack);
      throw new InternalServerErrorException(
        'Error fetching customer by email',
      );
    }
  }
}
