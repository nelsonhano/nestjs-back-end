import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { PrismaOrmModule } from './prisma-orm/prisma-orm.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaOrmModule,
    BookmarkModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [AppService],
})
export class AppModule {}
