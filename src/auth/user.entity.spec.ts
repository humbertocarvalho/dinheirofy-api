import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
describe('UserEntity', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
    user.password = 'TestPassword';
    bcrypt.compare = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      bcrypt.compare.mockReturnValue(true);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('1234');
      expect(bcrypt.compare).toHaveBeenCalledWith('1234', 'TestPassword');
      expect(result).toBeTruthy();
    });

    it('returns false as password is valid', async () => {
      bcrypt.compare.mockReturnValue(false);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      const result = await user.validatePassword('1234');
      expect(bcrypt.compare).toHaveBeenCalledWith('1234', 'TestPassword');
      expect(result).not.toBeTruthy();
    });
  });
});
