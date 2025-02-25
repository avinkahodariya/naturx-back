import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../dto';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ lowercase: true, trim: true, unique: true })
  email: string;

  @Prop({ lowercase: true, unique: true, required: false })
  username: string;

  @Prop({ required: false })
  password: string;


  @Prop({ type: String, enum: Object.values(UserRoles) })
  role: UserRoles;

  @Prop({ required: false })
  fullName: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isBlock: boolean;

  @Prop({ required: false })
  dateOfBirth?: Date;

  @Prop({ required: false })
  gender?: string;

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: false })
  address?: string;

  @Prop({ required: false })
  socialMediaLinks?: string[];

  @Prop({ required: false })
  jobTitle?: string;

  @Prop({ required: false })
  organization?: string;

  @Prop({ required: false })
  workAddress?: string;

  @Prop({ required: false })
  department?: string;

  @Prop({ required: false })
  idProof?: string;

  @Prop({ required: false })
  certifications?: string[];

  @Prop({ required: false })
  notes?: string;

  @Prop({ type: [String], required: false })
  @ApiProperty({ required: false })
  images?: string[];

  @Prop({ type: String, required: false })
  @ApiProperty({ required: false })
  profileImage?: string;

  @Prop({ type: [String], required: false })
  @ApiProperty({ required: false })
  documents?: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
