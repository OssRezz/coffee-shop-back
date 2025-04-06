import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEntryUseCase } from 'src/entries/application/use-cases/create-entry.use-case';
import { GetAllEntriesUseCase } from 'src/entries/application/use-cases/get-all-entries.use-case';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { buildResponse } from 'src/common/helpers/response.helper';

@Controller('entries')
export class EntryController {
  constructor(
    private readonly createEntryUseCase: CreateEntryUseCase,
    private readonly getAllEntriesUseCase: GetAllEntriesUseCase,
  ) {}

  @Get()
  async getAllEntries() {
    const entries = await this.getAllEntriesUseCase.execute();
    return buildResponse(entries, 'All entries');
  }

  @Post()
  async createEntry(@Body() data: CreateEntryDto) {
    const entry = await this.createEntryUseCase.execute(
      data.productId,
      data.quantity,
    );
    return buildResponse(entry, 'Entry created successfully');
  }
}
