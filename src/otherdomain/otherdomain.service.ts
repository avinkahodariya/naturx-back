import { OtherDomain, OtherDomainDocument, SearchParamsDTO } from '@app/schema';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ICreateOtherDomainDTO,
  IUpdateOtherDomainDTO,
} from './dto/otherdomain';

@Injectable()
export class OtherDomainService {
  constructor(
    @InjectModel(OtherDomain.name)
    private otherDomainModel: Model<OtherDomainDocument>,
  ) {}

  async createOtherDomain(
    createOtherDomainDTO: ICreateOtherDomainDTO,
  ): Promise<void> {
    const newOtherDomain = new this.otherDomainModel(createOtherDomainDTO);
    await newOtherDomain.save();
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
      query.$or = [
        { storeName: regex },
        { contactInfo: regex },
        { teamName: regex },
        { teamName: regex },
        { clubName: regex },
      ];
    }
    const result = await this.otherDomainModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.otherDomainModel.countDocuments(query).exec();

    return { otherDomains: result, total };
  }

  async getById(id: string): Promise<OtherDomain> {
    const otherDomain = await this.otherDomainModel.findById(id).exec();
    if (!otherDomain) {
      throw new BadRequestException('Other domain not found');
    }
    return otherDomain;
  }

  async update(id: string, updateData: IUpdateOtherDomainDTO): Promise<void> {
    await this.otherDomainModel.findByIdAndUpdate(id, { $set: updateData });
  }

  async delete(id: string): Promise<void> {
    await this.otherDomainModel.findByIdAndDelete(id);
  }
}
