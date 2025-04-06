import { Region } from '../entities/region.entity';
export interface RegionRepository {
  create(name: string): Promise<Region>;
  getAll(): Promise<Region[]>;
  getById(id: number): Promise<Region | null>;
  exists(id: number): Promise<boolean>;
}
