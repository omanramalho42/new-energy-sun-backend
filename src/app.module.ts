import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { LeadRepository } from './repositories/lead-repository';
import { PrismaLeadRepository } from './repositories/prisma/prisma-lead-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: LeadRepository,
      useClass: PrismaLeadRepository,
    },
  ],
})
export class AppModule {}
