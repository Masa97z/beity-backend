import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasourceUrl: process.env.DATABASE_URL, // تمرير الرابط هنا ديناميكياً
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}