import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from '../auth/user.entity';
import { GetWalletsFilterDto } from './dto/get-wallets-filter.dto';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  async getWallets(
    filterDto: GetWalletsFilterDto,
    user: User,
  ): Promise<Wallet[]> {
    return;
  }

  async createWallet(
    createWalletDto: CreateWalletDto,
    user: User,
  ): Promise<Wallet> {
    const { description } = createWalletDto;

    const wallet = new Wallet();
    wallet.description = description;
    wallet.user = user;
    await wallet.save();
    delete wallet.user;
    return wallet;
  }
}
