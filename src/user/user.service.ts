import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    //return await this.userRepository.save(createUserDto);
    return await this.userRepository.save({
      name: createUserDto.name,
      password: crypto
        .createHmac('sha256', createUserDto.password)
        .digest('hex'),
      email: createUserDto.email,
    });
  }

  async findByEmail(email: string, password: string) {
    password = crypto.createHmac('sha256', password).digest('hex');
    return await this.userRepository.findOne({ email, password });
  }

  async findOne(user: IUser) {
    return await this.userRepository.findOne(user.id);
  }

  async findEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async findById(userId: number) {
    return await this.userRepository.findOne(userId);
  }
}
