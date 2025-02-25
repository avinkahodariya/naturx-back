import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsDateString,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'libs/schema/src';

export interface IUserResponse {
  users: User[];
  total: number;
}

export class IUserUpdateRequest {
  @ApiProperty({ description: 'Full name of the user', required: false })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Date of birth of the user', required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Gender of the user', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: 'Address of the user', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Social media links associated with the user',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  socialMediaLinks?: string[];

  @ApiProperty({ description: 'Whether the user is blocked', required: false })
  @IsBoolean()
  @IsOptional()
  isBlock?: boolean;

  @ApiProperty({ description: 'Whether the user is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: 'Job title of the user', required: false })
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({ description: 'Organization of the user', required: false })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({ description: 'Work address of the user', required: false })
  @IsString()
  @IsOptional()
  workAddress?: string;

  @ApiProperty({ description: 'Department of the user', required: false })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ description: 'ID proof of the user', required: false })
  @IsString()
  @IsOptional()
  idProof?: string;

  @ApiProperty({ description: 'Certifications of the user', required: false, type: [String] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ description: 'Notes about the user', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false, type: String })
  @IsString({ each: true })
  @IsOptional()
  profileImage?: string;
}

export class ICreateUserDTO {
  @ApiProperty({ description: 'Email of the user', required: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Full name of the user', required: false })
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'Username of the user', required: false })
  @IsString()
  username?: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Date of birth of the user', required: false })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({ description: 'Gender of the user', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ description: 'Address of the user', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Social media links associated with the user',
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  socialMediaLinks?: string[];

  @ApiProperty({ description: 'Job title of the user', required: false })
  @IsString()
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({ description: 'Organization of the user', required: false })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({ description: 'Work address of the user', required: false })
  @IsString()
  @IsOptional()
  workAddress?: string;

  @ApiProperty({ description: 'Department of the user', required: false })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ description: 'ID proof of the user', required: false })
  @IsString()
  @IsOptional()
  idProof?: string;

  @ApiProperty({ description: 'Certifications of the user', required: false, type: [String] })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  certifications?: string[];

  @ApiProperty({ description: 'Notes about the user', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false, type: String })
  @IsString({ each: true })
  @IsOptional()
  profileImage?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  images?: string[];


  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

}
