import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCustomerSourceDTO,
  UpdateCustomerSourceDTO,
} from './dto/customer-source';
import {
  CustomerSource,
  CustomerSourceDocument,
} from '@app/schema/schema/products-category.schema';
import { SearchParamsDTO } from '@app/schema';

@Injectable()
export class CustomerSourceService {
  constructor(
    @InjectModel(CustomerSource.name)
    private customerSourceModal: Model<CustomerSourceDocument>,
  ) {}

  async createCustomerSource(
    createCustomerSourceDTO: CreateCustomerSourceDTO,
  ): Promise<void> {
    const newCustomerSource = new this.customerSourceModal(
      createCustomerSourceDTO,
    );
    await newCustomerSource.save();
  }

  async get(params: SearchParamsDTO): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;
    if (params.isActive) {
      query.isActive = params.isActive;
    }
    if (params.search) {
      const regex = new RegExp(params.search, 'i');
      query.$or = [{ name: regex }];
    }
    const list = await this.customerSourceModal
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.customerSourceModal.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<CustomerSource> {
    const customerSource = await this.customerSourceModal.findById(id).exec();
    if (!customerSource) {
      throw new BadRequestException('product not found');
    }
    return customerSource;
  }

  async update(id: string, updateData: UpdateCustomerSourceDTO): Promise<void> {
    const updatedCustomerSource = await this.customerSourceModal
      .findByIdAndUpdate(id, { $set: updateData })
      .exec();
    if (!updatedCustomerSource) {
      throw new BadRequestException('product not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedCustomerSource = await this.customerSourceModal
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
    if (!deletedCustomerSource) {
      throw new BadRequestException('CustomerSource not found');
    }
  }
}
