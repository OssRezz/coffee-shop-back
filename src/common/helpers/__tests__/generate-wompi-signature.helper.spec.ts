import { generateWompiSignature } from '../generate-wompi-signature.helper';
import { createHash } from 'crypto';

jest.mock('crypto');

describe('generateWompiSignature', () => {
  it('should generate a SHA-256 hash from the input data', () => {
    const input = {
      reference: 'order-abc123',
      amountInCents: 5000,
      currency: 'COP',
      integrityKey: 'test_integrity_key',
    };

    const mockUpdate = jest.fn().mockReturnThis();
    const mockDigest = jest.fn().mockReturnValue('mocked_hash_123');

    (createHash as jest.Mock).mockReturnValue({
      update: mockUpdate,
      digest: mockDigest,
    });

    const result = generateWompiSignature(input);

    const expectedRaw = `${input.reference}${input.amountInCents}${input.currency}${input.integrityKey}`;

    expect(createHash).toHaveBeenCalledWith('sha256');
    expect(mockUpdate).toHaveBeenCalledWith(expectedRaw);
    expect(mockDigest).toHaveBeenCalledWith('hex');
    expect(result).toBe('mocked_hash_123');
  });
});
