import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { buildResponse } from 'src/common/helpers/response.helper';
import { GetAllCustomersUseCase } from 'src/customers/application/use-cases/get-all-customers.use-case';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CreateCustomerUseCase } from 'src/customers/application/use-cases/create-customer.use-case';
import { GetCustomerByDocumentUseCase } from 'src/customers/application/use-cases/get-customer-by-document.use-case';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getCustomerByDocumentUseCase: GetCustomerByDocumentUseCase,
  ) {}

  @Get()
  async getAll() {
    const customers = await this.getAllCustomersUseCase.execute();
    return buildResponse(customers, 'All customers');
  }

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    const customer = await this.createCustomerUseCase.execute(dto);
    return {
      message: 'Customer created successfully',
      data: customer,
    };
  }

  @Get('document/:document')
  async getByDocument(@Param('document') document: string) {
    const customer = await this.getCustomerByDocumentUseCase.execute(document);
    return {
      message: `Customer with document ${document} found`,
      data: customer,
    };
  }
}
