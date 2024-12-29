import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';
import { SeederService } from './seeder/seeder.service';

@Module({
  imports: [PrismaModule, ContactModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SeederService],
})
export class AppModule {}
