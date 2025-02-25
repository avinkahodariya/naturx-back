import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class AWSSchema {
  @Prop({ required: true, trim: true, lowercase: true })
  @ApiProperty({})
  bucketName: string;

  @Prop({ required: true, trim: true, lowercase: true })
  @ApiProperty({})
  key: string;
}

export const AWSSchemaSchema = SchemaFactory.createForClass(AWSSchema);
