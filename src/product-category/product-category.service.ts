import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProductCategoryDTO,
  UpdateProductCategoryDTO,
} from './dto/product-category';
import {
  ProductCategory,
  ProductCategoryDocument,
} from '@app/schema/schema/products-category.schema';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory.name)
    private productCategoryModel: Model<ProductCategoryDocument>,
  ) {}

  async createProductCategory(
    createProductCategoryDTO: CreateProductCategoryDTO,
  ): Promise<void> {
    const newProductCategory = new this.productCategoryModel(
      createProductCategoryDTO,
    );
    await newProductCategory.save();
  }

  async get(params: any): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.productCategoryModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.productCategoryModel.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoryModel.findById(id).exec();
    if (!productCategory) {
      throw new BadRequestException('product not found');
    }
    return productCategory;
  }

  async update(
    id: string,
    updateData: UpdateProductCategoryDTO,
  ): Promise<void> {
    const updatedProductCategory = await this.productCategoryModel
      .findByIdAndUpdate(id, { $set: updateData })
      .exec();
    if (!updatedProductCategory) {
      throw new BadRequestException('product not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedProductCategory = await this.productCategoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProductCategory) {
      throw new BadRequestException('ProductCategory not found');
    }
  }
}
