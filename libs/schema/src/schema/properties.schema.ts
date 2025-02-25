import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema({
  timestamps: true,
})
export class Property {

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  propertyName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: false })
  size: string;

  @Prop({ required: false })
  purchaseLeaseDate?: Date;

  @Prop({ required: false })
  purchasePriceLeaseTerms: string;

  // Maintenance & Financial Information
  @Prop({ required: false })
  propertyValue?: string;

  @Prop({ required: false })
  mortgageProvider: string;

  @Prop({ required: false })
  loanAmount?: string;

  @Prop({ required: false })
  monthlyPayments?: number;

  @Prop({ required: false })
  tenantNames?: string[];

  @Prop({
    type: {
      start: Date,
      end: Date,
    },
    required: false,
  })
  rentalAgreementDates?: {
    start: Date;
    end: Date;
  };

  @Prop({ required: false })
  rentAmount?: number;

  @Prop({ required: false })
  serviceProviders?: string[];

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  media?: string[];

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  documents?: string[];
}

export const PropertySchema = SchemaFactory.createForClass(Property);
