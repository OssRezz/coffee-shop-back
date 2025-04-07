import { Body, Controller, Post } from '@nestjs/common';
import { CreateSaleUseCase } from 'src/sales/application/use-cases/create-sale.use-case';
import { CreateSaleDto } from '../dto/create-sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly createSaleUseCase: CreateSaleUseCase) {}

  @Post()
  async create(@Body() dto: CreateSaleDto) {
    const sale = await this.createSaleUseCase.execute(dto);
    return {
      success: true,
      message: 'Sale created successfully',
      data: sale,
    };
  }
}
