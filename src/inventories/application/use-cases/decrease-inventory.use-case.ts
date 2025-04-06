import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { ProductRepository } from 'src/products/domain/ports/product.repository';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';

@Injectable()
export class DecreaseInventoryUseCase {
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

    if (!currentInventory) {
      throw new NotFoundException(
        `No inventory found for product ID ${productId}`,
      );
    }

    if (currentInventory.quantity < amount) {
      throw new BadRequestException(
        `Insufficient inventory for product ID ${productId}`,
      );
    }

    const newQuantity = currentInventory.quantity - amount;
    return this.inventoryRepository.updateQuantity(productId, newQuantity);
  }
}
