import { IsString, IsOptional, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Create OtherDomain DTO
export class ICreateOtherDomainDTO {
  @ApiProperty({ description: 'Name of the store', required: true })
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @ApiProperty({ description: 'Location of the store', required: true })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Details of inventory', required: false })
  @IsString()
  @IsOptional()
  inventoryDetails?: string;

  @ApiProperty({ description: 'Contact information', required: false })
  @IsString()
  @IsOptional()
  contactInfo?: string;

  @ApiProperty({ description: 'Team name', required: false })
  @IsString()
  @IsOptional()
  teamName?: string;

  @ApiProperty({ description: 'Players names and positions', required: false })
  @IsArray()
  @IsOptional()
  playersNamesPositions?: string[];

  @ApiProperty({ description: 'Practice schedules', required: false })
  @IsString()
  @IsOptional()
  practiceSchedules?: string;

  @ApiProperty({ description: 'Match details', required: false })
  @IsString()
  @IsOptional()
  matchDetails?: string;

  @ApiProperty({ description: 'Club name', required: false })
  @IsString()
  @IsOptional()
  clubName?: string;

  @ApiProperty({ description: 'List of members', required: false })
  @IsArray()
  @IsOptional()
  memberList?: string[];

  @ApiProperty({ description: 'Event details', required: false })
  @IsString()
  @IsOptional()
  eventDetails?: string;
}

// Update OtherDomain DTO
export class IUpdateOtherDomainDTO {
  @ApiProperty({ description: 'Name of the store', required: false })
  @IsString()
  @IsOptional()
  storeName?: string;

  @ApiProperty({ description: 'Location of the store', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ description: 'Details of inventory', required: false })
  @IsString()
  @IsOptional()
  inventoryDetails?: string;

  @ApiProperty({ description: 'Contact information', required: false })
  @IsString()
  @IsOptional()
  contactInfo?: string;

  @ApiProperty({ description: 'Team name', required: false })
  @IsString()
  @IsOptional()
  teamName?: string;

  @ApiProperty({ description: 'Players names and positions', required: false })
  @IsArray()
  @IsOptional()
  playersNamesPositions?: string[];

  @ApiProperty({ description: 'Practice schedules', required: false })
  @IsString()
  @IsOptional()
  practiceSchedules?: string;

  @ApiProperty({ description: 'Match details', required: false })
  @IsString()
  @IsOptional()
  matchDetails?: string;

  @ApiProperty({ description: 'Club name', required: false })
  @IsString()
  @IsOptional()
  clubName?: string;

  @ApiProperty({ description: 'List of members', required: false })
  @IsArray()
  @IsOptional()
  memberList?: string[];

  @ApiProperty({ description: 'Event details', required: false })
  @IsString()
  @IsOptional()
  eventDetails?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  documents?: string[];
}
