import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    const wallet = this.walletService.create(createWalletDto);
    console.log(wallet);
    return wallet;
  }

  @Put()
  update(@Body() updateWalletDTO: UpdateWalletDto) {}
}
