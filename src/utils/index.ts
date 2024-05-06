import { ParseIntPipe } from '@nestjs/common';
import * as crypto from 'crypto';

export const md5 = (str: string) => {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
};

//#region 检验Number类型
export const generateParseIntPipe = (name: string) => {
  return new ParseIntPipe({
    exceptionFactory() {
      throw new Error(`Validation failed (value: ${name} is not an integer)`);
    },
  });
};
//#endregion
