import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { saltRounds } from '../constants';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (value && typeof value.password === 'string') {
      value.password = await bcrypt.hash(value.password, saltRounds);
      return value;
    }
  }
}
