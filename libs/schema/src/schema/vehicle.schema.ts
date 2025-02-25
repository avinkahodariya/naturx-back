import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../dto';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({
  timestamps: true,
})
export class Vehicle {

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: false })
  dateOfManufacture?: Date;

  @Prop({ required: false })
  vehicleType: string;

  @Prop({ required: false })
  model: string;

  @Prop({ required: false })
  vinNumber: string;

  @Prop({ required: false })
  licensePlateNumber: string;

  @Prop({ required: false })
  dateOfPurchase?: Date;

  @Prop({ required: false })
  purchasePrice: string;

  //insaurance

  @Prop({ required: false })
  insuranceProvider: string;

  @Prop({ required: false })
  policyNumber: string;

  @Prop({ required: false })
  idProof?: string;

  @Prop({ required: false })
  CoverageDetails: string;

  @Prop({ required: false })
  expiryDate: Date;

  @Prop({ required: false })
  lateServiceDate: Date;

  @Prop({ required: false })
  serviceProviderName: string;

  @Prop({ required: false })
  notes: string;

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  media?: string[];

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  documents?: string[];

}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
