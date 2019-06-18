import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    // TODO verificar por que tem que registrar isso aqui sempre mesmo importando direto no app module.
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
