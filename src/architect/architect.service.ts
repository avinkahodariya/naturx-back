import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArchitectDTO, UpdateArchitectDTO } from './dto/architect';
import { Architect, ArchitectDocument, JwtUserPayload } from '@app/schema';

@Injectable()
export class ArchitectService {
  constructor(
    @InjectModel(Architect.name)
    private architectModel: Model<ArchitectDocument>,
  ) {}

  async createArchitect(
    createArchitectDTO: CreateArchitectDTO,
    req: JwtUserPayload,
  ): Promise<void> {
    const newArchitect = new this.architectModel({
      ...createArchitectDTO,
      isActive: true,
    });
    await newArchitect.save();
  }

  async get(params: any): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.architectModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.architectModel.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<Architect> {
    const architect = await this.architectModel.findById(id).exec();
    if (!architect) {
      throw new BadRequestException('product not found');
    }
    return architect;
  }

  async update(id: string, updateData: UpdateArchitectDTO): Promise<void> {
    const updatedArchitect = await this.architectModel
      .findByIdAndUpdate(id, { $set: updateData })
      .exec();
    if (!updatedArchitect) {
      throw new BadRequestException('product not found');
    }
  }

  async delete(id: string): Promise<void> {
    const deletedArchitect = await this.architectModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedArchitect) {
      throw new BadRequestException('Architect not found');
    }
  }
}
