import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { buildResponse } from 'src/common/helpers/response.helper';
import { CreateProductTypeUseCase } from 'src/product-types/application/use-cases/create-product-type.use-case';
import { GetAllProductTypeUseCase } from 'src/product-types/application/use-cases/get-all-product-type.use-case';
import { GetProductTypeByIdUseCase } from 'src/product-types/application/use-cases/get-product-type-by-id.use-case';
import { CreateProductTypeDto } from '../dto/product-type.dto';

@Controller('product-types')
export class ProductTypesController {
  constructor(
    private readonly createProductTypeUseCase: CreateProductTypeUseCase,
    private readonly getAllProductTypeUseCase: GetAllProductTypeUseCase,
    private readonly getProductTypeByIdUseCase: GetProductTypeByIdUseCase,
  ) {}

  @Get()
  async getProductTypes() {
    const productTypes = await this.getAllProductTypeUseCase.execute();
    return buildResponse(productTypes, 'All product types');
  }

  @Post()
  async create(@Body() data: CreateProductTypeDto) {
    const productType = await this.createProductTypeUseCase.execute(data.name);
    return buildResponse(productType, 'Product type created successfully');
  }

  @Get('/:id')
  async getProductType(@Param('id', ParseIntPipe) id: number) {
    const productType = await this.getProductTypeByIdUseCase.execute(id);
    return buildResponse(productType, `Product type with id ${id} found`);
  }
}
