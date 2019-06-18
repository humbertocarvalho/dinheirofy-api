import { User } from '../../user/user.entity';

export interface IWallet {
  id: number;
  description: string;
  user: User;
}