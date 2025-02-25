import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { ID } from '../dto';

export type ProductCategoryDocument = HydratedDocument<ProductCategory>;

@Schema({
  timestamps: true,
})
export class ProductCategory {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'User' })
  createdBy: ID | User;

  @Prop({ type: Boolean, required: false, default: true })
  isActive: boolean;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
