import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    const wallet = this.walletService.create(createWalletDto);
    return wallet;
  }

  @Put('/:walletId')
  update(
    @Param('walletId') walletId: number,
    @Body() updateWalletDTO: UpdateWalletDto,
  ) {
    return this.walletService.update(walletId, updateWalletDTO);
  }

  @Delete('/:walletId')
  delete(@Param('walletId') walletId: number) {
    return this.walletService.delete(walletId);
  }

  @Get()
  async findAll() {
    const wallet = await this.walletService.findAll();
    return this.walletService.findAll();
  }
}
