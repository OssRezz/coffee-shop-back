import { Inventory } from '../entities/inventory.entity';

export interface InventoryRepository {
  findByProductId(productId: number): Promise<Inventory | null>;
  create(productId: number, quantity: number): Promise<Inventory>;
  updateQuantity(productId: number, quantity: number): Promise<Inventory>;
  getAvailableInventories(filters: {
    region?: number;
    productType?: number;
    pageLength: number;
    page?: number;
    cursor?: number;
  }): Promise<any[]>;
}
