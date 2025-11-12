import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { ArtistsModule } from './artists/artists.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), PrismaModule, EventsModule, ArtistsModule, ResourcesModule],
  controllers: [AppController, ArtistsController],
  providers: [AppService, EventsService, ArtistsService],
})
export class AppModule { }
