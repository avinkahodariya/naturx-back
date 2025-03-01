import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DBSchemas } from '@app/schema';

@Module({
  imports: [DBSchemas.products],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
