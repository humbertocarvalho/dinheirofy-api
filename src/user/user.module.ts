import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // TODO verificar por que tem que registrar isso aqui sempre mesmo importando direto no app module.
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
