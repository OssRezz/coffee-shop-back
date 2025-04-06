import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetAllInventoriesDto } from '../dto/get-all-inventories.dto';
import { GetAllInventoriesUseCase } from 'src/inventories/application/use-cases/get-all-inventories.use-case';
import { buildResponse } from 'src/common/helpers/response.helper';
import { IncreaseInventoryDto } from '../dto/increase-inventory.dto';
import { IncreaseInventoryUseCase } from 'src/inventories/application/use-cases/increase-inventory.use-case';
import { DecreaseInventoryUseCase } from 'src/inventories/application/use-cases/decrease-inventory.use-case';
import { DecreaseInventoryDto } from '../dto/decrease-inventory.dto';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly getAllInventoriesUseCase: GetAllInventoriesUseCase,
    private readonly increaseInventoryUseCase: IncreaseInventoryUseCase,
    private readonly decreaseInventoryUseCase: DecreaseInventoryUseCase,
  ) {}

  @Get()
  async getAllInventories(@Query() query: GetAllInventoriesDto) {
    const inventories = await this.getAllInventoriesUseCase.execute(query);
    return buildResponse(inventories, 'All inventories');
  }

  // ⚠️ ⚠️ ⚠️ ! IMPORTANTE !
  // Los siguientes métodos (increase/decrease) se exponen únicamente para pruebas.
  // En un flujo real, estas operaciones deben realizarse exclusivamente a través de un ingreso o una venta,
  // ya que están directamente vinculadas al modelo de datos del sistema.
  // Usarlos fuera de esos casos puede romper la integridad del flujo de inventario.
  @Post('increase')
  async increaseInventory(@Body() dto: IncreaseInventoryDto) {
    const result = await this.increaseInventoryUseCase.execute(
      dto.productId,
      dto.quantity,
    );
    return buildResponse(result, 'Inventory successfully increased');
  }

  @Post('decrease')
  async decreaseInventory(@Body() dto: DecreaseInventoryDto) {
    const result = await this.decreaseInventoryUseCase.execute(
      dto.productId,
      dto.quantity,
    );
    return buildResponse(result, 'Inventory successfully decreased');
  }
}
