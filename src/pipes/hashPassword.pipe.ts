import {
  PipeTransform,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    const hashPassword = async (
      password: string,
      saltRounds = 10,
    ): Promise<string> => {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
      } catch (error) {
        throw new BadRequestException();
      }
    };

    if (value && typeof value.password === 'string') {
      value.password = await hashPassword(value.password);
      return value;
    } else {
      throw new ForbiddenException();
    }
  }
}
