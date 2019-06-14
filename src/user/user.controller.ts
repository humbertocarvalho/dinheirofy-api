import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../user/user.entity';

@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User): Promise<any> {
    return this.userService.create(user);
  }
}
