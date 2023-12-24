import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtPayloadWithRt } from 'src/types';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
   constructor(public config: ConfigService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         secretOrKey: 'RT_SECRET',
         passReqToCallback: true,
      });
   }

   validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
      const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();
      if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

      return {
         ...payload,
         refreshToken,
      };
   }
}
