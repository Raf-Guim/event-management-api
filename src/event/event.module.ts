import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ParticipantModule } from 'src/participant/participant.module';

@Module({
  imports: [DatabaseModule, ParticipantModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
