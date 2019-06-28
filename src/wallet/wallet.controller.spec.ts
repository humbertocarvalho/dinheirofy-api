import { Test } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [WalletController],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    walletController = module.get<WalletController>(WalletController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      // jest.spyOn(walletService, 'findAll').mockImplementation(() => result);
      // expect(await walletController.findAll()).toBe(result);
    });
  });
});
