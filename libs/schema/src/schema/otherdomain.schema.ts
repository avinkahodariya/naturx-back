import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type OtherDomainDocument = HydratedDocument<OtherDomain>;

@Schema({
  timestamps: true,
})
export class OtherDomain {
  @Prop({ required: true })
  storeName: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: false })
  inventoryDetails?: string;

  @Prop({ required: false })
  contactInfo?: string;

  @Prop({ required: false })
  teamName?: string;

  @Prop({ required: false, type: [String] })
  playersNamesPositions?: string[];

  @Prop({ required: false })
  practiceSchedules?: string;

  @Prop({ required: false })
  matchDetails?: string;

  @Prop({ required: false })
  clubName?: string;

  @Prop({ required: false, type: [String] })
  memberList?: string[];

  @Prop({ required: false })
  eventDetails?: string;

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  media?: string[];

  @Prop({ type: [String], required: true })
  @ApiProperty({ required: false })
  documents?: string[];
}

export const OtherDomainSchema = SchemaFactory.createForClass(OtherDomain);
