import { ConflictException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { AuthDTO } from './dto';
import { User } from 'src/generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaOrmService) {}

  async signUp(dto: AuthDTO) {
    try {
      const hashedPassword = await argon.hash(String(dto.password));

      const user: User = await this.prismaService.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });

      return { message: 'User created successfully', userId: user.id };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Email ${dto.email} already used.`);
      }
      throw new Error(e);
    }
  }

  signIn(dto: AuthDTO) {
    console.log({ dto });
    return 'Sign in successful';
  }
}
