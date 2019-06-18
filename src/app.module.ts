import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PhotoModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
