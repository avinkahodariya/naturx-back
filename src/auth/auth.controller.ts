import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ChangePasswordRequest,
  LoginDTO,
  LoginResponse,
  RefreshDTO,
  RegisterDTO,
  ResetPasswordDTO,
  VerifyTokenDTO,
} from './dto/auth';
import { Public, User, SearchParamsDTO } from 'libs/schema/src';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() user: LoginDTO): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @Post('register')
  @Public()
  @HttpCode(200)
  async register(@Body() user: RegisterDTO): Promise<LoginResponse> {
    return this.authService.register(user);
  }

  @Post('refresh-token')
  @HttpCode(200)
  @Public()
  refreshToken(@Body() refreshData: RefreshDTO): Promise<LoginResponse> {
    return this.authService.refreshToken(refreshData);
  }

  @Get('me')
  @HttpCode(200)
  me(@Request() req: any): Promise<User> {
    return this.authService.me(req.user);
  }

  @Post('change-password')
  @HttpCode(200)
  changePassword(
    @Body() reqData: ChangePasswordRequest,
    @Request() req: any,
  ): Promise<void> {
    return this.authService.changePassword(reqData, req.user);
  }

  @Get('list')
  @HttpCode(200)
  @Public()
  list(@Query() params: SearchParamsDTO): Promise<User[]> {
    return this.authService.list(params);
  }

  @Post('forget-password')
  @Public()
  @HttpCode(200)
  async sendResetToken(@Body('email') email: string): Promise<void> {
    return this.authService.forgetPassword(email);
  }

  @Post('verify-reset-token')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify the reset token' })
  async verifyResetToken(@Body() body: VerifyTokenDTO): Promise<void> {
    await this.authService.verifyResetToken(body.email, body.token);
  }

  @Post('reset-password')
  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'Reset the password using a valid token' })
  async resetPassword(
    @Body() resetPasswordData: ResetPasswordDTO,
  ): Promise<void> {
    await this.authService.resetPassword(
      resetPasswordData.email,
      resetPasswordData.token,
      resetPasswordData.newPassword,
    );
  }
}
