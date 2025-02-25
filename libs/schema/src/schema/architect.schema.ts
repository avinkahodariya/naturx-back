import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { ID } from '../dto';

export type ArchitectDocument = HydratedDocument<Architect>;

@Schema({
  timestamps: true,
})
export class Architect {
  @Prop({ trim: true, unique: true })
  name: string;

  @Prop({ trim: true })
  whatsappNo: string;

  @Prop({ trim: true })
  contactNo: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'User' })
  createdBy: ID | User;

  @Prop({ type: Boolean, required: false, default: true })
  isActive: boolean;
}

export const ArchitectSchema = SchemaFactory.createForClass(Architect);
