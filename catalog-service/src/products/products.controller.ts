import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    this.logger.log('Getting all products with availability');
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Getting product ${id} with availability`);
    return this.productsService.findOne(id);
  }
}
