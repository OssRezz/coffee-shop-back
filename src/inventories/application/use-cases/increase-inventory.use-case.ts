import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';

@Injectable()
export class IncreaseInventoryUseCase {
  constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,

    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(productId: number, amount: number): Promise<Inventory> {
    const product = await this.productRepository.getById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const currentInventory =
      await this.inventoryRepository.findByProductId(productId);

    if (currentInventory) {
      const newQuantity = currentInventory.quantity + amount;
      return this.inventoryRepository.updateQuantity(productId, newQuantity);
    }

    return this.inventoryRepository.create(productId, amount);
  }
}
