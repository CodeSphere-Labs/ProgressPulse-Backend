import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import type { Response } from 'express';
import { TransformDataInterceptor } from 'src/common/interceptors/transform.data';
import { ResponseSignInDto } from 'src/auth/dto/ResponseSignIn.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(new TransformDataInterceptor(ResponseSignInDto))
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(signInDto);

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
    });

    return { ...user, accessToken };
  }

  @Post('refresh-token')
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('log-out/:id')
  logout(@Param('id') id: string | number) {
    return this.authService.logout(Number(id));
  }
}
