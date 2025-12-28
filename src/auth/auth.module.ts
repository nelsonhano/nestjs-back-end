import { Module } from '@nestjs/common';

import { PrismaOrmModule } from 'src/prisma-orm/prisma-orm.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaOrmModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
