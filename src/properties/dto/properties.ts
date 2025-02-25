import { IsString, IsOptional, IsDateString, IsNumber, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from '@app/schema';

// Create Property DTO
export class ICreatePropertyDTO {
  @ApiProperty({ description: 'Name of the property owner', required: true })
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({ description: 'Name of the property', required: true })
  @IsString()
  @IsNotEmpty()
  propertyName: string;

  @ApiProperty({ description: 'Address of the property', required: true })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Type of the property (e.g., Residential, Commercial)', required: true })
  @IsString()
  @IsNotEmpty()
  propertyType: string;

  @ApiProperty({ description: 'Size of the property', required: false })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ description: 'Purchase or Lease date', required: false })
  @IsDateString()
  @IsOptional()
  purchaseLeaseDate?: Date;

  @ApiProperty({ description: 'Purchase price or lease terms', required: false })
  @IsString()
  @IsOptional()
  purchasePriceLeaseTerms?: string;

  @ApiProperty({ description: 'Value of the property', required: false })
  @IsNumber()
  @IsOptional()
  propertyValue?: number;

  @ApiProperty({ description: 'Name of the mortgage provider', required: false })
  @IsString()
  @IsOptional()
  mortgageProvider?: string;

  @ApiProperty({ description: 'Loan amount', required: false })
  @IsNumber()
  @IsOptional()
  loanAmount?: number;

  @ApiProperty({ description: 'Monthly payments', required: false })
  @IsNumber()
  @IsOptional()
  monthlyPayments?: number;

  @ApiProperty({ description: 'Tenant names', required: false })
  @IsArray()
  @IsOptional()
  tenantNames?: string[];

  @ApiProperty({ description: 'Rental agreement start and end dates', required: false })
  @IsOptional()
  rentalAgreementDates?: { start: Date; end: Date };

  @ApiProperty({ description: 'Rent amount', required: false })
  @IsNumber()
  @IsOptional()
  rentAmount?: number;

  @ApiProperty({ description: 'List of service providers', required: false })
  @IsArray()
  @IsOptional()
  serviceProviders?: string[];
}

// Update Property DTO
export class IUpdatePropertyDTO {
  @ApiProperty({ description: 'Name of the property owner', required: false })
  @IsString()
  @IsOptional()
  ownerName?: string;

  @ApiProperty({ description: 'Name of the property', required: false })
  @IsString()
  @IsOptional()
  propertyName?: string;

  @ApiProperty({ description: 'Address of the property', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Type of the property (e.g., Residential, Commercial)', required: false })
  @IsString()
  @IsOptional()
  propertyType?: string;

  @ApiProperty({ description: 'Size of the property', required: false })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ description: 'Purchase or Lease date', required: false })
  @IsDateString()
  @IsOptional()
  purchaseLeaseDate?: Date;

  @ApiProperty({ description: 'Purchase price or lease terms', required: false })
  @IsString()
  @IsOptional()
  purchasePriceLeaseTerms?: string;

  @ApiProperty({ description: 'Value of the property', required: false })
  @IsNumber()
  @IsOptional()
  propertyValue?: number;

  @ApiProperty({ description: 'Name of the mortgage provider', required: false })
  @IsString()
  @IsOptional()
  mortgageProvider?: string;

  @ApiProperty({ description: 'Loan amount', required: false })
  @IsNumber()
  @IsOptional()
  loanAmount?: number;

  @ApiProperty({ description: 'Monthly payments', required: false })
  @IsNumber()
  @IsOptional()
  monthlyPayments?: number;

  @ApiProperty({ description: 'Tenant names', required: false })
  @IsArray()
  @IsOptional()
  tenantNames?: string[];

  @ApiProperty({ description: 'Rental agreement start and end dates', required: false })
  @IsOptional()
  rentalAgreementDates?: { start: Date; end: Date };

  @ApiProperty({ description: 'Rent amount', required: false })
  @IsNumber()
  @IsOptional()
  rentAmount?: number;

  @ApiProperty({ description: 'List of service providers', required: false })
  @IsArray()
  @IsOptional()
  serviceProviders?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

}

// Property Response Interface
export interface IPropertyResponse {
  properties: Property[];
  total: number;
}
