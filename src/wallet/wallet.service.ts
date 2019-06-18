import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Wallet } from './wallet.entity';
import { IWallet } from './interfaces/wallet.interface';
import { IUser } from '../user/interfaces/user.interface';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    let newWallet = new Wallet();
    newWallet.description = createWalletDto.description;
    newWallet.user = await this.userRepository.findOne({
      where: { id: createWalletDto.userId },
    });
    return await this.walletRepository.save(newWallet);
  }

  async findById(id: string) {
    return await this.walletRepository.findByIds([{ id }]);
  }

  async findByUser(user: IUser) {
    const { id, email } = user;

    const qb = await getRepository(Wallet)
      .createQueryBuilder('wallet')
      .where('wallet.user.id = :userId', { id })
      .orWhere('user.email = :email', { email });

    return await qb.getMany();
  }
}
