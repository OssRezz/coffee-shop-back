import { ProductType } from '../entities/product-type.entity';
export interface ProductTypeRepository {
  create(name: string): Promise<ProductType>;
  getAll(): Promise<ProductType[]>;
  getById(id: number): Promise<ProductType | null>;
  exists(id: number): Promise<boolean>;
}
