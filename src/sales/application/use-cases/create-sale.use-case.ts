import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSaleDto } from 'src/sales/interfaces/dto/create-sale.dto';
import { SaleRepository } from 'src/sales/domain/ports/sale.repository';
import { InventoryRepository } from 'src/inventories/domain/ports/inventory.repository';
import { Sale } from 'src/sales/domain/entities/sale.entity';
import { SaleDetail } from 'src/sales/domain/entities/sale-detail.entity';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject('SaleRepository')
    private readonly saleRepository: SaleRepository,
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(dto: CreateSaleDto): Promise<Sale> {
    const { transactionId, address, totalAmount, details } = dto;

    const saleDetails: SaleDetail[] = [];

    for (const item of details) {
      const inventory = await this.inventoryRepository.findByProductId(
        item.productId,
      );

      if (!inventory) {
        throw new NotFoundException(
          `Inventory not found for product ${item.productId}`,
        );
      }

      if (inventory.quantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient inventory for product ${item.productId}`,
        );
      }

      const newQuantity = inventory.quantity - item.quantity;
      await this.inventoryRepository.updateQuantity(
        item.productId,
        newQuantity,
      );

      saleDetails.push(
        new SaleDetail(0, 0, item.productId, item.price, item.quantity),
      );
    }

    const saleEntity = new Sale(
      0,
      transactionId ?? null,
      address,
      totalAmount,
      'COMPLETED',
      new Date(),
      new Date(),
    );

    return await this.saleRepository.create(saleEntity, saleDetails);
  }
}
