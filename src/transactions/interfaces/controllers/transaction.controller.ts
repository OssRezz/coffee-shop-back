import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WompiTokenizeCardUseCase } from 'src/transactions/application/use-cases/wompi-tokenize-card.use-case';
import { WompiTokenizeCardDto } from '../dto/wompi-tokenize-card.dto';
import { GetWompiAcceptanceTokenUseCase } from 'src/transactions/application/use-cases/get-wompi-acceptance-token.use-case';
import { WompiCreateTransactionDto } from '../dto/wompi-create-transaction.dto';
import { WompiCreateTransactionUseCase } from 'src/transactions/application/use-cases/create-wompi-transaction.use-case';
import { GetWompiTransactionStatusUseCase } from 'src/transactions/application/use-cases/get-wompi-transaction-status.use-case';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly wompiTokenizeCardUseCase: WompiTokenizeCardUseCase,
    private readonly getWompiAcceptanceTokenUseCase: GetWompiAcceptanceTokenUseCase,
    private readonly createWompiTransactionUseCase: WompiCreateTransactionUseCase,
    private readonly getWompiStatusUseCase: GetWompiTransactionStatusUseCase,
  ) {}

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
