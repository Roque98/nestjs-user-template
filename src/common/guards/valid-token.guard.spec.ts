import { ValidTokenGuard } from './valid-token.guard';

describe('ValidTokenGuard', () => {
  it('should be defined', () => {
    expect(new ValidTokenGuard()).toBeDefined();
  });
});
