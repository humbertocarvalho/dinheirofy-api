import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
