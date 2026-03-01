import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- هذا السطر ضروري جداً هنا!
})
export class PrismaModule {}