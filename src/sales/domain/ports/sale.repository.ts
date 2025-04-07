import { SaleDetail } from '../entities/sale-detail.entity';
import { Sale } from '../entities/sale.entity';

export interface SaleRepository {
  create(
    sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>,
    details: Omit<SaleDetail, 'id'>[],
  ): Promise<Sale>;
}
