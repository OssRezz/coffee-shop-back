import { Inject, Injectable } from '@nestjs/common';
import { GetAllInventoriesDto } from 'src/inventories/interfaces/dto/get-all-inventories.dto';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';

@Injectable()
export class GetAllInventoriesUseCase {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(dto: GetAllInventoriesDto) {
    return this.inventoryRepository.getAvailableInventories({
      region: dto.region,
      productType: dto.product_type,
    });
  }
}
