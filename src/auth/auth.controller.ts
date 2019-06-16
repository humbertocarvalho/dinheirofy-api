import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('token')
  async createToken(@Body() authUserDto: AuthUserDto): Promise<any> {
    const user = await this.userService.findByEmail(
      authUserDto.email,
      authUserDto.password,
    );

    if (user) {
      return await this.authService.createToken(user);
    }

    return 'User not found';
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
