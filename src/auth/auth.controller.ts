import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    const activationToken = await this.authService.generateActivationToken(user);
    // подключить одноразовый имейл

    return { message: 'User registered. Please check your email to activate your account.' };
  }

  @Get('activate/:token')
  async activateAccount(@Param('token') token: string, @Res() res: Response) {
    try {
      const decoded = await this.authService.verifyToken(token);
      const user = await this.usersService.findOne(decoded.username);
      
      if (!user) {
        return res.status(400).send('Invalid token.');
      }

      
      await this.usersService.update(user.id, { isActive: true });

      return res.send('Account activated successfully.');
    } catch (error) {
      return res.status(400).send('Invalid or expired token.');
    }
  }
}
