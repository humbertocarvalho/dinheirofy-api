import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../auth/user.entity';

@Entity({
  name: 'wallet',
})
export class Wallet extends BaseEntity {
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

  @ManyToOne(type => User, user => user.wallets)
  @JoinColumn({ name: 'wallet_user_id' })
  user: User;
}
