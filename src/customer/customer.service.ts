import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDTO, UpdateCustomerDTO } from './customer.dto';
import { Customer, CustomerDocument, SearchParamsDTO } from '@app/schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  /** Create a new customer */
  async createCustomer(createCustomerDTO: CreateCustomerDTO): Promise<void> {
    // Ensure name is trimmed and lowercased
    const customerName = createCustomerDTO.clientName.trim().toLowerCase();

    // Check for duplicate customer name
    const existingCustomer = await this.customerModel
      .findOne({ clientName: customerName })
      .collation({ locale: 'en', strength: 2 });

    if (existingCustomer) {
      throw new BadRequestException(
        `Customer with name "${createCustomerDTO.clientName}" already exists`,
      );
    }

    // Validate architect details if architectSourceCustomer is true
    if (createCustomerDTO.architectSourceCustomer) {
      if (
        !createCustomerDTO.architect ||
        !createCustomerDTO.architectContactNo
      ) {
        throw new BadRequestException(
          'Architect details are required when architectSourceCustomer is true',
        );
      }
    }

    // Create customer
    const newCustomer = new this.customerModel({
      ...createCustomerDTO,
      clientName: customerName,
      architect: createCustomerDTO.architect
        ? new Types.ObjectId(createCustomerDTO.architect)
        : null,
    });

    await newCustomer.save();
  }

  /** Get all customers with pagination */
  async getAllCustomers(
    params: SearchParamsDTO,
  ): Promise<{ list: Customer[]; total: number }> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.customerModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.customerModel.countDocuments().exec();

    return { list, total };
  }

  /** Get customer by ID */
  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    return customer;
  }

  /** Update customer */
  async updateCustomer(
    id: string,
    updateCustomerDTO: UpdateCustomerDTO,
  ): Promise<void> {
    const existing = await this.customerModel.findById(id);
    if (!existing) {
      throw new BadRequestException('Customer not found');
    }

    // Ensure name is trimmed and lowercased (if provided)
    if (updateCustomerDTO.clientName) {
      updateCustomerDTO.clientName = updateCustomerDTO.clientName
        .trim()
        .toLowerCase();

      // Check for duplicate customer name (excluding current one)
      const duplicate = await this.customerModel
        .findOne({ clientName: updateCustomerDTO.clientName, _id: { $ne: id } })
        .collation({ locale: 'en', strength: 2 });

      if (duplicate) {
        throw new BadRequestException(
          `Customer with name "${updateCustomerDTO.clientName}" already exists`,
        );
      }
    }

    // Validate architect details if updating architectSourceCustomer to true
    if (updateCustomerDTO.architectSourceCustomer) {
      if (
        !updateCustomerDTO.architect ||
        !updateCustomerDTO.architectContactNo
      ) {
        throw new BadRequestException(
          'Architect details are required when architectSourceCustomer is true',
        );
      }
    }

    // Convert architect ID if provided
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateCustomerDTO,
            architect: updateCustomerDTO.architect
              ? new Types.ObjectId(updateCustomerDTO.architect)
              : existing.architect,
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedCustomer) {
      throw new BadRequestException('Customer not found');
    }
  }

  /** Soft delete customer (set isActive to false) */
  async deleteCustomer(id: string): Promise<void> {
    const deletedCustomer = await this.customerModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
    if (!deletedCustomer) {
      throw new BadRequestException('Customer not found');
    }
  }
}
