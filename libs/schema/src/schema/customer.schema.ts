import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ID, UserRoles } from '../dto';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { Architect } from './architect.schema';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop({})
  branch: string;

  @Prop({})
  clientName: string;

  @Prop({ required: false })
  contactNo: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'Architect' })
  architect: ID | Architect;

  @Prop({ type: String })
  architectWhatsappNo: string;

  @Prop({ type: String })
  architectContactNo: string;

  @Prop({ required: false })
  whatsappNo: string;

  @Prop({ required: false })
  architectSourceCustomer: boolean;

  @Prop({ required: false })
  isActive: boolean;

  @Prop({ required: false })
  media: [string];

  @Prop({
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.Customer,
  })
  role: UserRoles;

  @Prop({ required: false })
  address: string;

  @Prop({ required: false })
  addressLocationLink: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
