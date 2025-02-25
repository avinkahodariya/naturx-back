import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ID } from '../dto';

export enum TokenType {
  Email = 'email-verification',
  Token = 'token',
}

export type UserTokenDocument = HydratedDocument<UserToken>;

@Schema({
  timestamps: true,
})
export class UserToken {
  @ApiProperty()
  @Prop({ lowercase: true, trim: true })
  token: string;

  @ApiProperty()
  @Prop({ type: String, enum: TokenType, default: TokenType.Token })
  type: TokenType;

  @ApiProperty()
  @Prop({ type: mSchema.Types.ObjectId, ref: 'User' })
  user: ID | User;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
