import { ConflictException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaOrmService } from 'src/prisma-orm/prisma-orm.service';
import { AuthDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { User } from 'generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaOrmService) {}

  async signUp(dto: AuthDTO) {
    try {
      const hashedPassword = await argon.hash(String(dto.password));

      const user: User = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      return {
        message: 'User created successfully',
        userId: user.id,
        email: user.email,
      };
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
