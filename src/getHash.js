import { createHash } from 'crypto';

/**
 * @param { string } input
 * @param { number } hashLength
 *
 * @returns { string }
 * */
export const getHash = ({ input, hashLength }) =>
  createHash('sha256').update(input).digest('base64url').substring(0, hashLength);
