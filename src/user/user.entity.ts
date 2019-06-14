import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as crypto from 'crypto';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: string;

  @BeforeInsert()
  hashPassword() {
    // this.password = crypto.createHmac('sha256', this.password).digest('hex');
    this.password = 'polenta';
  }
}
