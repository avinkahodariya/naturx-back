import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ID } from '../dto';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { Area, ProductCategory } from './products-category.schema';
import { Products } from './products.schema';

enum QuotationStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}

export type QuotationDocument = HydratedDocument<Quotation>;

@Schema({
  timestamps: true,
})
export class Quotation {
  @Prop({ required: true, unique: true, trim: true }) // Enforce uniqueness, case insensitivity, and trimming
  name: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'ProductCategory' })
  category: ID | ProductCategory;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'Products' })
  product: ID | Products;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'Area' })
  area: ID | Area;

  @Prop({ required: true, default: 0, type: Number })
  rate: number;

  @Prop({ required: true, default: 0, type: Number })
  sqFeet: number;

  @Prop({ required: true, default: 0, type: Number })
  tax: number;

  @Prop({ required: true, default: 0, type: Number })
  labor: number;

  @Prop({ required: true, default: 0, type: Number })
  discount: number;

  @Prop({ required: false, type: Number })
  total: number;

  @Prop({ required: true, default: true, type: Boolean })
  isActive: boolean;

  @Prop({
    type: String,
    enum: QuotationStatus,
    default: QuotationStatus.PENDING,
  })
  status: QuotationStatus;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'User' })
  createdBy: ID | User;
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
