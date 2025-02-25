import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { AppConfigModule, AppConfigService } from 'libs/config/src';
import { DBSchemas } from 'libs/schema/src';
import { AuthController } from './auth.controller';


@Module({
  imports: [
    DBSchemas.user,
    DBSchemas.userToken,
    PassportModule,
    AppConfigModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) => {
        const config = await configService.getJWTConfig();
        return {
          secret: config.secret,
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule { }
