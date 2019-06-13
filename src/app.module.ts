import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(), PhotoModule, AuthModule],
  controllers: [WalletController, UserController],
  providers: [WalletService, UserService],
})
export class AppModule {}
