import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaOrmService extends PrismaClient {
  constructor(config: ConfigService) {

    const pool = new Pool({
      connectionString: config.get('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });
  }
}
