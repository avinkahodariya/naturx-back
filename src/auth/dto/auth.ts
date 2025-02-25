import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsEnum, IsArray, IsOptional } from 'class-validator';
import { UserRoles } from 'libs/schema/src';

export class LoginDTO {
  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @ApiProperty({ description: 'First name of the user', required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email of the user', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password for the user', required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Role of the user', enum: UserRoles, required: true })
  @IsEnum(UserRoles)
  @IsNotEmpty()
  role: UserRoles;
}

export class RefreshDTO {
  @ApiProperty({ description: 'Refresh token for the session', required: true })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class LoginResponse {
  @ApiProperty({ description: 'Access token for the user', required: true })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token for the user', required: true })
  refreshToken: string;

  @ApiProperty({ description: 'Token expiration time in seconds', required: true })
  expires_in: number;

  @ApiProperty({ description: 'User ID', required: true })
  id: string;

  @ApiProperty({ description: 'Role of the user', required: true, enum: UserRoles })
  role: UserRoles;

  @ApiProperty({ description: 'Email of the user', required: true })
  email: string;

  @ApiProperty({ description: 'profile', required: true })
  profileImage: string;
}

export class ChangePasswordRequest {
  @ApiProperty({ description: 'Old password of the user', required: true })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: 'New password for the user', required: true })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class VerifyTokenDTO {
  @ApiProperty({ description: 'Email of the user for verification', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Verification token for the user', required: true })
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ResetPasswordDTO {
  @ApiProperty({ description: 'Email of the user for resetting password', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Reset token for the user', required: true })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'New password for the user', required: true })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
