import { Product } from '../entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  updateStatus(id: number, status: boolean): Promise<Product>;
}
