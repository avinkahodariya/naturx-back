import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mSchema } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop({ required: true, unique: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  registrationNumber: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true })
  gstNumber: string;

  @Prop({ required: false, unique: true })
  taxNumber: string;

  @Prop({ required: false, unique: true })
  panNumber: string;

  @Prop({ required: false, unique: true })
  website: string;

  @Prop({ required: false })
  contactNumber: string;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  isActive: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
