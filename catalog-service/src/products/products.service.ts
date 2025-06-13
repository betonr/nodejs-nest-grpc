import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  InventoryServiceClient,
  Product,
} from './interfaces/products.interface';

@Injectable()
export class ProductsService implements OnModuleInit {
  private inventoryService: InventoryServiceClient;
  private readonly logger = new Logger(ProductsService.name);

  // Mock database of products
  private readonly products: Product[] = [
    {
      id: '1',
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 1299.99,
    },
    {
      id: '2',
      name: 'Smartphone',
      description: 'Latest model smartphone',
      price: 899.99,
    },
    {
      id: '3',
      name: 'Headphones',
      description: 'Noise-cancelling headphones',
      price: 249.99,
    },
    {
      id: '4',
      name: 'Monitor',
      description: '4K Ultra HD Monitor',
      price: 349.99,
    },
    {
      id: '5',
      name: 'Keyboard',
      description: 'Mechanical gaming keyboard',
      price: 129.99,
    },
  ];

  constructor(
    @Inject('INVENTORY_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.inventoryService =
      this.client.getService<InventoryServiceClient>('InventoryService');
  }

  async findAll() {
    const productsWithStock = await Promise.all(
      this.products.map(async (product) => {
        try {
          const stockInfo = await firstValueFrom(
            this.inventoryService.checkStock({ productId: product.id }),
          );

          return {
            ...product,
            inStock: stockInfo.inStock,
            quantity: stockInfo.quantity,
          };
        } catch (error) {
          this.logger.error(
            `Error fetching stock for product ${product.id}`,
            error,
          );
          return {
            ...product,
            inStock: false,
            quantity: 0,
            error: 'Unable to fetch stock information',
          };
        }
      }),
    );

    return productsWithStock;
  }

  async findOne(id: string) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      return { error: 'Product not found' };
    }

    try {
      const stockInfo = await firstValueFrom(
        this.inventoryService.checkStock({ productId: id }),
      );

      return {
        ...product,
        inStock: stockInfo.inStock,
        quantity: stockInfo.quantity,
      };
    } catch (error) {
      this.logger.error(`Error fetching stock for product ${id}`, error);
      return {
        ...product,
        inStock: false,
        quantity: 0,
        error: 'Unable to fetch stock information',
      };
    }
  }
}
