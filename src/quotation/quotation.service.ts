// quotation.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Quotation,
  QuotationDocument,
  QuotationItem,
  QuotationItemDocument,
  JwtUserPayload,
  SearchParamsDTO,
} from '@app/schema';
import { CreateQuotationDTO, UpdateQuotationDTO } from './dto/quotation';

@Injectable()
export class QuotationService {
  constructor(
    @InjectModel(Quotation.name)
    private readonly quotationModel: Model<QuotationDocument>,

    // ←— Inject the item model
    @InjectModel(QuotationItem.name)
    private readonly quotationItemModel: Model<QuotationItemDocument>,
  ) {}

  /** CREATE: first make the quotation, then its items, then link them */
  async createQuotation(
    dto: CreateQuotationDTO,
    user: JwtUserPayload,
  ): Promise<Quotation> {
    const { quotationItems: itemsIn, ...quotationFields } = dto;
    const count: number = await this.quotationModel.countDocuments({}).exec();
    // 1) create the quotation
    const quotation = new this.quotationModel({
      ...quotationFields,
      createdBy: new Types.ObjectId(user.id),
      quotationId: `QUO-${count + 1}`,
    });
    await quotation.save();

    // 2) if there are items, create & link them
    if (itemsIn?.length) {
      const createdItems = await Promise.all(
        itemsIn.map((itemDto) => {
          return new this.quotationItemModel({
            ...itemDto,
            createdBy: new Types.ObjectId(user.id),
            // assuming you want to track parent
            quotation: quotation._id,
          }).save();
        }),
      );
      quotation.quotationItems = createdItems.map((i) => i._id);
      await quotation.save();
    }

    return quotation.populate('quotationItems');
  }

  /** READ (list) */
  async findAll(
    params: SearchParamsDTO,
  ): Promise<{ list: Quotation[]; total: number }> {
    const skip = (params.page ?? 0) * (params.limit ?? 100);
    const limit = params.limit ?? 100;

    const query = { isActive: true };
    const [list, total] = await Promise.all([
      this.quotationModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'quotationItems',
          populate: [
            { path: 'category', model: 'ProductCategory' }, // Populate the category field
            { path: 'area', model: 'Area' }, // Populate the area field
            { path: 'product', model: 'Products' }, // Populate the product field
          ],
        })
        .exec(),
      this.quotationModel.countDocuments(query).exec(),
    ]);

    return { list, total };
  }

  /** READ (single) */
  async findOne(id: string): Promise<Quotation> {
    const q = await this.quotationModel
      .findById(id)
      .populate({
        path: 'quotationItems',
        populate: [
          { path: 'category', model: 'ProductCategory' }, // Populate the category field
          { path: 'area', model: 'Area' }, // Populate the area field
          { path: 'product', model: 'Products' }, // Populate the product field
        ],
      })
      .exec();
    if (!q) throw new BadRequestException('Quotation not found');
    return q;
  }

  /** UPDATE: basic fields + reconcile items if provided */
  async update(id: string, dto: UpdateQuotationDTO): Promise<Quotation> {
    const existing = await this.quotationModel.findById(id);
    if (!existing) throw new BadRequestException('Quotation not found');

    const { quotationItems: itemsIn, ...fieldsToSet } = dto;

    // 1) update core quotation fields
    Object.assign(existing, fieldsToSet);
    await existing.save();

    // 2) if items array is passed, upsert them
    if (itemsIn) {
      // Step 1: Update existing items
      await Promise.all(
        itemsIn.map(async (itemDto) => {
          const existingItem = existing.quotationItems.find(
            (itemId) => itemId.toString() === itemDto._id.toString(),
          );

          if (existingItem) {
            // If the item exists, update it
            await this.quotationItemModel.findByIdAndUpdate(existingItem, {
              ...itemDto,
              updatedAt: new Date(),
            });
          } else {
            // If the item doesn't exist, create a new item
            const newItem = new this.quotationItemModel({
              ...itemDto,
              createdBy: existing.createdBy,
              quotation: existing._id,
            });
            await newItem.save();
            existing.quotationItems.push(newItem._id);
          }
        }),
      );

      // Save the quotation with updated items
      await existing.save();
    }

    // Return the updated quotation populated with the quotation items
    return existing.populate('quotationItems');
  }

  /** DELETE: soft‑delete quotation & its items */
  async remove(id: string): Promise<void> {
    const quotation = await this.quotationModel.findById(id);
    if (!quotation) throw new BadRequestException('Quotation not found');

    // soft‑delete quotation itself
    quotation.isActive = false;
    await quotation.save();

    // soft‑delete all linked items
    await this.quotationItemModel.updateMany(
      { _id: { $in: quotation.quotationItems } },
      { isActive: false },
    );
  }

  async removeQuotationItem(quotationId: string, id: string): Promise<void> {
    await this.quotationItemModel.findByIdAndUpdate(id, { isActive: false });
  }
}
