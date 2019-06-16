import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { exists } from 'fs';

@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get('/exists/:email')
  async exists(@Param('email') email: string): Promise<boolean> {
    const user = await this.userService.findEmail(email);
    return !!user;
  }
}
