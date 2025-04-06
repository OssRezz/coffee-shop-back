import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntryRepository } from 'src/entries/domain/ports/entry.repository';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { Entry } from 'src/entries/domain/entities/entry.entity';

@Injectable()
export class CreateEntryUseCase {
  constructor(
    @Inject('EntryRepository')
    private readonly entryRepository: EntryRepository,

    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,

    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(productId: number, quantity: number): Promise<Entry> {
    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const entry = await this.entryRepository.create(productId, quantity);
    const inventory = await this.inventoryRepository.findByProductId(productId);

    if (inventory) {
      await this.inventoryRepository.updateQuantity(
        productId,
        inventory.quantity + quantity,
      );
    } else {
      await this.inventoryRepository.create(productId, quantity);
    }

    return entry;
  }
}
