import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { WalletRepository } from './wallet.repository';
import { User } from '../auth/user.entity';
import { GetWalletsFilterDto } from './dto/get-wallets-filter.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRepository)
    private readonly walletRepository: WalletRepository,
  ) {}

  async createWallet(
    createWalletDto: CreateWalletDto,
    user: User,
  ): Promise<Wallet> {
    return await this.walletRepository.createWallet(createWalletDto, user);
  }

  async updateDescription(
    walletId: number,
    description: string,
    user: User,
  ): Promise<Wallet> {
    const wallet = await this.getWalletById(walletId, user);
    wallet.description = description;
    await wallet.save();
    return wallet;
  }

  async deleteWallet(id: number, user: User): Promise<void> {
    const rowsAffected = await this.walletRepository.delete({ id, user });
    if (rowsAffected.affected === 0) {
      throw new NotFoundException(`Wallet with id ${id} not found`);
    }
  }

  async getWallets(
    filterDto: GetWalletsFilterDto,
    user: User,
  ): Promise<Wallet[]> {
    return this.walletRepository.getWallets(filterDto, user);
  }

  async getWalletById(walletId: number, user: User): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, user },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with id ${walletId} not found!`);
    }

    return wallet;
  }
}
