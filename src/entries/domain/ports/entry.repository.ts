import { Entry } from '../entities/entry.entity';
export interface EntryRepository {
  getAll(): Promise<Entry[]>;
  create(productId: number, quantity: number): Promise<Entry>;
}
