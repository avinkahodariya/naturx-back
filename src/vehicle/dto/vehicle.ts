import { IsString, IsOptional, IsDateString, IsNotEmpty, ArrayMinSize, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'libs/schema/src';

export interface IVehicleResponse {
  vehicles: Vehicle[];
  total: number;
}

export class IVehicleUpdateRequest {
  @ApiProperty({ description: 'Name of the vehicle owner', required: false })
  @IsString()
  @IsOptional()
  ownerName?: string;

  @ApiProperty({ description: 'Date of manufacture of the vehicle', required: false })
  @IsDateString()
  @IsOptional()
  dateOfManufacture?: Date;

  @ApiProperty({ description: 'Type of the vehicle (e.g., Car, Truck)', required: false })
  @IsString()
  @IsOptional()
  vehicleType?: string;

  @ApiProperty({ description: 'Model of the vehicle', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({ description: 'Vehicle Identification Number', required: false })
  @IsString()
  @IsOptional()
  vinNumber?: string;

  @ApiProperty({ description: 'License plate number of the vehicle', required: false })
  @IsString()
  @IsOptional()
  licensePlateNumber?: string;

  @ApiProperty({ description: 'Date of purchase of the vehicle', required: false })
  @IsDateString()
  @IsOptional()
  dateOfPurchase?: Date;

  @ApiProperty({ description: 'Purchase price of the vehicle', required: false })
  @IsString()
  @IsOptional()
  purchasePrice?: string;

  @ApiProperty({ description: 'Name of the insurance provider', required: false })
  @IsString()
  @IsOptional()
  insuranceProvider?: string;

  @ApiProperty({ description: 'Policy number of the insurance', required: false })
  @IsString()
  @IsOptional()
  policyNumber?: string;

  @ApiProperty({ description: 'Proof of identification document for the vehicle', required: false })
  @IsString()
  @IsOptional()
  idProof?: string;

  @ApiProperty({ description: 'Coverage details of the insurance', required: false })
  @IsString()
  @IsOptional()
  coverageDetails?: string;

  @ApiProperty({ description: 'Insurance expiry date', required: false })
  @IsDateString()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ description: 'Date when the vehicle is due for late service', required: false })
  @IsDateString()
  @IsOptional()
  lateServiceDate?: Date;

  @ApiProperty({ description: 'Name of the service provider', required: false })
  @IsString()
  @IsOptional()
  serviceProviderName?: string;

  @ApiProperty({ description: 'Additional notes related to the vehicle', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class ICreateVehicleDTO {
  @ApiProperty({ description: 'Name of the vehicle owner', required: true })
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @ApiProperty({ description: 'Date of manufacture of the vehicle', required: false })
  @IsDateString()
  @IsOptional()
  dateOfManufacture?: Date;

  @ApiProperty({ description: 'Type of the vehicle (e.g., Car, Truck)', required: false })
  @IsString()
  @IsOptional()
  vehicleType?: string;

  @ApiProperty({ description: 'Model of the vehicle', required: false })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({ description: 'Vehicle Identification Number', required: false })
  @IsString()
  @IsOptional()
  vinNumber?: string;

  @ApiProperty({ description: 'License plate number of the vehicle', required: false })
  @IsString()
  @IsOptional()
  licensePlateNumber?: string;

  @ApiProperty({ description: 'Date of purchase of the vehicle', required: false })
  @IsDateString()
  @IsOptional()
  dateOfPurchase?: Date;

  @ApiProperty({ description: 'Purchase price of the vehicle', required: false })
  @IsString()
  @IsOptional()
  purchasePrice?: string;

  @ApiProperty({ description: 'Name of the insurance provider', required: false })
  @IsString()
  @IsOptional()
  insuranceProvider?: string;

  @ApiProperty({ description: 'Policy number of the insurance', required: false })
  @IsString()
  @IsOptional()
  policyNumber?: string;

  @ApiProperty({ description: 'Proof of identification document for the vehicle', required: false })
  @IsString()
  @IsOptional()
  idProof?: string;

  @ApiProperty({ description: 'Coverage details of the insurance', required: false })
  @IsString()
  @IsOptional()
  coverageDetails?: string;

  @ApiProperty({ description: 'Insurance expiry date', required: false })
  @IsDateString()
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ description: 'Date when the vehicle is due for late service', required: false })
  @IsDateString()
  @IsOptional()
  lateServiceDate?: Date;

  @ApiProperty({ description: 'Name of the service provider', required: false })
  @IsString()
  @IsOptional()
  serviceProviderName?: string;

  @ApiProperty({ description: 'Additional notes related to the vehicle', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  documents?: string[];

}
