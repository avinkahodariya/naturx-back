import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ID } from '../dto';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { Area, ProductCategory } from './products-category.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({
  timestamps: true,
})
export class Products {
  @Prop({ required: true, unique: true, trim: true }) // Enforce uniqueness, case insensitivity, and trimming
  name: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'ProductCategory' })
  category: ID | ProductCategory;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'Area' })
  area: ID | Area;

  @Prop({ required: true, default: 0, type: Number })
  ratePerSq: number;

  @Prop({ required: false, type: String })
  code: string;

  @Prop({ required: true, default: true, type: Boolean })
  isActive: boolean;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'User' })
  createdBy: ID | User;

  @Prop({ type: [String], required: true })
  media?: string[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
