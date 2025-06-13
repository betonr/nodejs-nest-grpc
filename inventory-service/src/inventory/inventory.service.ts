import { Injectable, Logger } from '@nestjs/common';
import { StockResponse } from './interfaces/inventory.interface';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  // Mock database of product inventory
  private readonly inventory = new Map<string, number>([
    ['1', 10],
    ['2', 5],
    ['3', 0],
    ['4', 25],
    ['5', 3],
  ]);

  checkStock(productId: string): StockResponse {
    this.logger.log(`Checking stock for product ${productId}`);

    const quantity = this.inventory.get(productId) || 0;
    const inStock = quantity > 0;

    return {
      productId,
      quantity,
      inStock,
    };
  }
}
