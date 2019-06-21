import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Wallet]),
    // TODO verificar por que tem que registrar isso aqui sempre mesmo importando direto no app module.
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [WalletService, UserService],
  controllers: [WalletController],
})
export class WalletModule {}
