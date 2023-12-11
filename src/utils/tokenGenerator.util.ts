import * as crypto from 'crypto';

export function tokenGenerator() {
  const randomBytes = crypto.randomBytes(30);
  return randomBytes.toString('hex');
}
