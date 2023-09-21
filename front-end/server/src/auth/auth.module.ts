import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';

@Global()
@Module({
   imports: [
      UsersModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
         inject: [ConfigService],
         useFactory: (config: ConfigService) => {
            return {
               secret: config.get<string>('JWT_SECRET'),
               signOptions: {
                  expiresIn: config.get<string | number>('JWT_EXPIRES'),
               },
            };
         },
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
   exports: [AuthService],
})
export class AuthModule {}
