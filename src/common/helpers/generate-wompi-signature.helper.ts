import { createHash } from 'crypto';

export function generateWompiSignature({
  reference,
  amountInCents,
  currency,
  integrityKey,
}: {
  reference: string;
  amountInCents: number;
  currency: string;
  integrityKey: string;
}): string {
  const rawString = `${reference}${amountInCents}${currency}${integrityKey}`;
  const hash = createHash('sha256').update(rawString).digest('hex');
  return hash;
}
