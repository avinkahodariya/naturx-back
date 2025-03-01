import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAreaDTO, UpdateAreaDTO } from './dto/area';
import {
  Area,
  AreaDocument,
} from '@app/schema/schema/products-category.schema';
import { SearchParamsDTO } from '@app/schema';

@Injectable()
export class AreaService {
  constructor(
    @InjectModel(Area.name)
    private areaModel: Model<AreaDocument>,
  ) {}

  async createArea(createAreaDTO: CreateAreaDTO): Promise<void> {
    const newArea = new this.areaModel(createAreaDTO);
    await newArea.save();
  }

  async get(params: SearchParamsDTO): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.areaModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.areaModel.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<Area> {
    const area = await this.areaModel.findById(id).exec();
    if (!area) {
      throw new BadRequestException('product not found');
    }
    return area;
  }

  async update(id: string, updateData: UpdateAreaDTO): Promise<void> {
    const updatedArea = await this.areaModel
      .findByIdAndUpdate(id, { $set: updateData })
      .exec();
    if (!updatedArea) {
      throw new BadRequestException('product not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedArea = await this.areaModel.findByIdAndDelete(id).exec();
    if (!deletedArea) {
      throw new BadRequestException('Area not found');
    }
  }
}
