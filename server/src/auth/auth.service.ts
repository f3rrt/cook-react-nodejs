import {
   Injectable,
   NotFoundException,
   UnauthorizedException,
   ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';
import { UsersService } from 'src/users/users.service';
//import bcrypt from 'bcryptjs'
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
      private config: ConfigService,
   ) {}

   matchPassword = async function (enteredPassword, password) {
      return await bcrypt.compare(enteredPassword, password);
   };

   async logIn(email: string, pass: string): Promise<any> {
      const user = await this.usersService.getUserByEmail(email);
      if (user) {
         const password = await this.matchPassword(pass, user?.password);
         if (!password) {
            throw new UnauthorizedException();
         }
         const tokens = await this.getTokens(user._id, user.email);
         await this.updateRefreshToken(user._id, tokens.refresh_token);
         return {
            tokens: tokens,
            email: user.email,
            name: user.name,
         };
      } else {
         throw new NotFoundException(`User not found`);
      }
   }
   async logout(userId: string): Promise<boolean> {
      await this.usersService.updateUser(userId, { refreshToken: null });
      return true;
   }
   async register(name: string, email: string, password: string): Promise<any> {
      const user = await this.usersService.getUserByEmail(email);
      if (user) {
         throw new UnauthorizedException();
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await this.usersService.createUser({
         name,
         email,
         password: hashedPassword,
      });

      const tokens = await this.getTokens(newUser._id, newUser.email);
      await this.updateRefreshToken(newUser._id, tokens.refresh_token);
      return tokens;
   }

   async refreshTokens(userId: string, rt: string): Promise<any> {

      const user = await this.usersService.getUser(userId);
      if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

      // const rtMatches = await argon.verify(user.hashedRt, rt);
      if (user.refreshToken !== rt) throw new ForbiddenException('Access Denied');

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
   }

   private async updateRefreshToken(id, refreshToken) {
      this.usersService.updateUser(id, { refreshToken });
   }

   private async getTokens(id, email) {
      const jwtPayload: JwtPayload = {
         sub: id,
         email: email,
      };

      const [at, rt] = await Promise.all([
         this.jwtService.signAsync(jwtPayload, {
            secret: 'AT_SECRET',
            expiresIn: '15m',
         }),
         this.jwtService.signAsync(jwtPayload, {
            secret: 'RT_SECRET',
            expiresIn: '7d',
         }),
      ]);

      return {
         access_token: at,
         refresh_token: rt,
      };
   }
}
