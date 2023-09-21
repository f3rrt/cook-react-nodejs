import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload, JwtPayloadWithRt } from '../../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-at') {
   constructor(public config: ConfigService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: config.get<string>('AT_SECRET'),
         passReqToCallback: true,
      });
   }

   validate(payload: JwtPayload) {
      return payload;
   }
}
