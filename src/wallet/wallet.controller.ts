import { Controller, Post, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/wallet/new')
  create(@Body() createWalletDto: CreateWalletDto): Promise<any> {
    return this.walletService.create(createWalletDto);
  }
}
