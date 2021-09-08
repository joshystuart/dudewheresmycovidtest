import { createHash } from 'crypto';

export function createId(id: string): string {
  return createHash('md5').update(id).digest('hex');
}
