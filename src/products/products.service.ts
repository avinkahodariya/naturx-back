import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProductsDTO, UpdateProductsDTO } from './dto/products';
import {
  ProductsDocument,
  SearchParamsDTO,
  Products,
  JwtUserPayload,
} from '@app/schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private productsModel: Model<ProductsDocument>,
  ) {}

  async createProducts(
    createProductsDTO: CreateProductsDTO,
    user: JwtUserPayload,
  ): Promise<void> {
    // Ensure name is trimmed and lowercased
    const productName = createProductsDTO.name.trim().toLowerCase();

    // Check if a product with the same name exists (case insensitive)
    const existingProduct = await this.productsModel
      .findOne({ name: productName })
      .collation({ locale: 'en', strength: 2 }); // Ensures case-insensitive search

    if (existingProduct) {
      throw new BadRequestException(
        `Product with name "${createProductsDTO.name}" already exists`,
      );
    }
    // Create a new product with properly formatted fields
    const newProducts = new this.productsModel({
      ...createProductsDTO,
      name: productName, // Save in lowercase to avoid duplicates
      area: new Types.ObjectId(createProductsDTO.area),
      category: new Types.ObjectId(createProductsDTO.category),
      createdBy: new Types.ObjectId(user.id),
    });

    await newProducts.save();
  }

  async get(params: SearchParamsDTO): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.productsModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.productsModel.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<Products> {
    const products = await this.productsModel.findById(id).exec();
    if (!products) {
      throw new BadRequestException('product not found');
    }
    return products;
  }

  async update(id: string, updateData: UpdateProductsDTO): Promise<void> {
    const existing = await this.productsModel.findById(id);
    if (!existing) {
      throw new BadRequestException('Product not found');
    }

    // Ensure name is trimmed and lowercased (if provided)
    if (updateData.name) {
      updateData.name = updateData.name.trim().toLowerCase();

      // Check for duplicate name (excluding the current product)
      const duplicate = await this.productsModel
        .findOne({ name: updateData.name, _id: { $ne: id } })
        .collation({ locale: 'en', strength: 2 });

      if (duplicate) {
        throw new BadRequestException(
          `Product with name "${updateData.name}" already exists`,
        );
      }
    }

    // Update category and area if provided
    const updatedProduct = await this.productsModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateData,
            category: updateData.category
              ? new Types.ObjectId(updateData.category as unknown as string)
              : existing.category,
            area: updateData.area
              ? new Types.ObjectId(updateData.area as unknown as string)
              : existing.area,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedProduct) {
      throw new BadRequestException('Product not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedProducts = await this.productsModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
    if (!deletedProducts) {
      throw new BadRequestException('Products not found');
    }
  }
}
