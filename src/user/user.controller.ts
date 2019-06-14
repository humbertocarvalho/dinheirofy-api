import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create() {}
}
