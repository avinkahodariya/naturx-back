import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Property, PropertyDocument } from 'libs/schema/src';
import { ICreatePropertyDTO, IPropertyResponse, IUpdatePropertyDTO } from './dto/properties';


@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<PropertyDocument>,
  ) { }

  async createProperty(createPropertyDTO: ICreatePropertyDTO): Promise<void> {
    const existingProperty = await this.propertyModel.findOne({ address: createPropertyDTO.address }).exec();
    if (existingProperty) {
      throw new BadRequestException('Property with this address already exists');
    }

    const newProperty = new this.propertyModel(createPropertyDTO);
    await newProperty.save();
  }

  async get(params: any): Promise<IPropertyResponse> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const result = await this.propertyModel.aggregate([
      { $match: query },
      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await this.propertyModel.countDocuments(query).exec();

    return { properties: result, total };
  }

  async getById(id: string): Promise<Property> {
    const property = await this.propertyModel.findById(id).exec();
    if (!property) {
      throw new BadRequestException('Property not found');
    }
    return property;
  }

  async update(id: string, updateData: IUpdatePropertyDTO): Promise<void> {
    await this.propertyModel.findByIdAndUpdate(id, { $set: updateData });
  }

  async delete(id: string): Promise<void> {
    await this.propertyModel.findByIdAndDelete(id);
  }
}
