import { v4 as uuidv4 } from 'uuid';

export function generateTransactionReference(): string {
  return `order-${uuidv4()}-${Date.now()}`;
}
