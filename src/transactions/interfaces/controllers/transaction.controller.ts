import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WompiTokenizeCardUseCase } from 'src/transactions/application/use-cases/wompi-tokenize-card.use-case';
import { WompiTokenizeCardDto } from '../dto/wompi-tokenize-card.dto';
import { GetWompiAcceptanceTokenUseCase } from 'src/transactions/application/use-cases/get-wompi-acceptance-token.use-case';
import { WompiCreateTransactionDto } from '../dto/wompi-create-transaction.dto';
import { WompiCreateTransactionUseCase } from 'src/transactions/application/use-cases/create-wompi-transaction.use-case';
import { GetWompiTransactionStatusUseCase } from 'src/transactions/application/use-cases/get-wompi-transaction-status.use-case';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { PurchaseOrderUseCase } from 'src/transactions/application/use-cases/purchase-order.use-case';
import { GetTransactionWithSalesUseCase } from 'src/transactions/application/use-cases/get-transaction-by-transaction-Id.use-case';
import { buildResponse } from 'src/common/helpers/response.helper';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly wompiTokenizeCardUseCase: WompiTokenizeCardUseCase,
    private readonly getWompiAcceptanceTokenUseCase: GetWompiAcceptanceTokenUseCase,
    private readonly createWompiTransactionUseCase: WompiCreateTransactionUseCase,
    private readonly getWompiStatusUseCase: GetWompiTransactionStatusUseCase,
    private readonly purchaseOrderUseCase: PurchaseOrderUseCase,
    private readonly getTransactionWithSalesUseCase: GetTransactionWithSalesUseCase,
  ) {}

  @Post('checkout')
  async checkout(@Body() dto: CreateTransactionDto) {
    return await this.purchaseOrderUseCase.execute(dto);
  }

  @Get('/:transactionId')
  async getTransaction(@Param('transactionId') transactionId: string) {
    const transaction =
      await this.getTransactionWithSalesUseCase.execute(transactionId);

    return buildResponse(
      transaction,
      `Transaction with id ${transactionId} found`,
    );
  }

  @Post('/wompi/tokenize')
  async tokenize(@Body() dto: WompiTokenizeCardDto) {
    return this.wompiTokenizeCardUseCase.execute(dto);
  }

  @Get('wompi/acceptance-tokens')
  async getAcceptanceTokens() {
    return this.getWompiAcceptanceTokenUseCase.execute();
  }

  @Post('wompi/create')
  async create(@Body() dto: WompiCreateTransactionDto) {
    return this.createWompiTransactionUseCase.execute(dto);
  }

  @Get('wompi/:transactionId')
  async getStatus(@Param('transactionId') transactionId: string) {
    return this.getWompiStatusUseCase.execute(transactionId);
  }
}
