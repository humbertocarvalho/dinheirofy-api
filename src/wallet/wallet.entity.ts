import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity({
  name: 'wallet',
})
export class Wallet {
  @PrimaryGeneratedColumn({
    name: 'wallet_id',
  })
  id: number;

  @Column({ length: 500 })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @ManyToOne(type => User, user => user.photos)
  @JoinColumn({ name: 'wallet_user_id' })
  user: User;
}
