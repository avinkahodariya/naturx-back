import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ID } from '../dto';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { QuotationItem } from './quotation-items.schema';

export enum QuotationStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}

export type QuotationDocument = HydratedDocument<Quotation>;

@Schema({ timestamps: true })
export class Quotation {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  quotationId: string;

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

  // ←— NEW: array of references to QuotationItem documents
  @Prop({
    type: [mSchema.Types.ObjectId],
    ref: 'QuotationItem',
    default: [],
  })
  quotationItems: (ID | QuotationItem)[];
}

export const QuotationSchema = SchemaFactory.createForClass(Quotation);
