import md5 from 'md5';

export function getPasswordHash(password: string): string {
  return md5(password);
}
