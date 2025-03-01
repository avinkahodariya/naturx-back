import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateQuotationDTO, UpdateQuotationDTO } from './dto/quotation';
import {
  QuotationDocument,
  SearchParamsDTO,
  Quotation,
  JwtUserPayload,
} from '@app/schema';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name)
    private quotationModel: Model<QuotationDocument>,
  ) {}

  async createQuotation(
    createQuotationDTO: CreateQuotationDTO,
    user: JwtUserPayload,
  ): Promise<void> {
    const newQuotation = new this.quotationModel({
      ...createQuotationDTO,
      area: new Types.ObjectId(createQuotationDTO.area),
      product: new Types.ObjectId(createQuotationDTO.product),
      category: new Types.ObjectId(createQuotationDTO.category),
      createdBy: new Types.ObjectId(user.id),
    });

    await newQuotation.save();
  }

  async get(params: SearchParamsDTO): Promise<any> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;

    const list = await this.quotationModel
      .find(query)
      .populate({ path: 'category', select: '_id name' })
      .populate({ path: 'product', select: '_id name' })
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.quotationModel.countDocuments(query).exec();

    return { list, total };
  }

  async getById(id: string): Promise<Quotation> {
    const quotation = await this.quotationModel.findById(id).exec();
    if (!quotation) {
      throw new BadRequestException('product not found');
    }
    return quotation;
  }

  async update(id: string, updateData: UpdateQuotationDTO): Promise<void> {
    const existing = await this.quotationModel.findById(id);
    if (!existing) {
      throw new BadRequestException('Product not found');
    }

    const updatedProduct = await this.quotationModel
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
    const deletedQuotation = await this.quotationModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
    if (!deletedQuotation) {
      throw new BadRequestException('Quotation not found');
    }
  }
}
