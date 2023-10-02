import {
   Body,
   Controller,
   Post,
   HttpCode,
   HttpStatus,
   Get,
   Request,
   UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constants';
import { RtGuard } from 'src/common/guards/rt.guard';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post('login')
   signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.logIn(signInDto.email, signInDto.password);
   }

   @HttpCode(HttpStatus.OK)
   @Post('register')
   register(@Body() signInDto: Record<string, any>) {
      return this.authService.register(signInDto.name, signInDto.email, signInDto.password);
   }


   // @Public()
   @UseGuards(RtGuard)
   @Post('refresh')
   @HttpCode(HttpStatus.OK)
   refreshTokens(
     userId: string,
     refreshToken: string,
   ): Promise<any> {
     return this.authService.refreshTokens(userId, refreshToken);
   }

   @Get('profile')
   getProfile(@Request() req) {
      return req.user;
   }
}
