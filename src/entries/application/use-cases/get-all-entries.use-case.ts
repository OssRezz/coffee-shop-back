import { Inject, Injectable } from '@nestjs/common';
import { EntryRepository } from 'src/entries/domain/ports/entry.repository';
import { Entry } from 'src/entries/domain/entities/entry.entity';

@Injectable()
export class GetAllEntriesUseCase {
  constructor(
    @Inject('EntryRepository')
    private readonly entryRepository: EntryRepository,
  ) {}

  async execute(): Promise<Entry[]> {
    return this.entryRepository.getAll();
  }
}
