import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  UseGuards,
  Query,
  ValidationPipe,
  ParseIntPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { GetWalletsFilterDto } from './dto/get-wallets-filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { Wallet } from './wallet.entity';
import { User } from '../auth/user.entity';

@Controller('wallet')
@UseGuards(AuthGuard())
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getWallets(
    @Query(ValidationPipe) filterDto: GetWalletsFilterDto,
    @GetUser() user: User,
  ): Promise<Wallet[]> {
    return this.walletService.getWallets(filterDto, user);
  }

  @Get('/:id')
  getWalletById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this.walletService.getWalletById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createWallet(
    @Body() createWalletDto: CreateWalletDto,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this.walletService.createWallet(createWalletDto, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: number, @GetUser() user: User) {
    return this.walletService.deleteWallet(id, user);
  }

  @Patch('/:id/description')
  update(
    @Param('id') id: number,
    @Body('description') description: string,
    @GetUser() user: User,
  ): Promise<Wallet> {
    return this.walletService.updateDescription(id, description, user);
  }
}
