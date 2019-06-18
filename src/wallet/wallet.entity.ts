import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

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
}
