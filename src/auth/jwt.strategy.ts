import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtUserPayload } from 'libs/schema/src';
import { AppConfigService } from 'libs/config/src';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJWTConfig().secret,
    });
  }

  async validate(payload: any): Promise<JwtUserPayload> {
    return {
      role: payload.role,
      email: payload.email,
      id: payload.id,
    };
  }
}
