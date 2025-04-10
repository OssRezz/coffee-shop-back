import { generateTransactionReference } from '../generate-transaction-reference.helper';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('generateTransactionReference', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should generate reference with uuid and timestamp', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
    const mockTimestamp = 1712345678901;

    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
    jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

    const result = generateTransactionReference();

    expect(result).toBe(`order-${mockUuid}-${mockTimestamp}`);
  });
});
