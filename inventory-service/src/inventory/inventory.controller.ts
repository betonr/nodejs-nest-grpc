import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import {
  CheckStockRequest,
  StockResponse,
} from './interfaces/inventory.interface';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @GrpcMethod('InventoryService', 'CheckStock')
  checkStock(data: CheckStockRequest): StockResponse {
    return this.inventoryService.checkStock(data.productId);
  }
}
