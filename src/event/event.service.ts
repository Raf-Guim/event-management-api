import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DatabaseService } from 'src/database/database.service';
import { ParticipantService } from 'src/participant/participant.service';

@Injectable()
export class EventService {
  constructor(
    private readonly dataBaseService: DatabaseService,
    private readonly participantService: ParticipantService,
  ) {}

  async create(data: CreateEventDto) {
    const { participants, ...eventData } = data;
    return this.dataBaseService.$transaction(async (dataBaseService) => {
      const event = await dataBaseService.event.create({
        data: eventData,
      });

      if (participants && participants.length > 0) {
        for (const participant of participants) {
          await dataBaseService.participant.create({
            data: { ...participant, eventId: event.id },
          });
        }
      }

      return dataBaseService.event.findUnique({
        where: { id: event.id },
        include: { participants: true },
      });
    });
  }

  findAll() {
    return this.dataBaseService.event.findMany({
      include: { participants: true },
    });
  }

  findOne(id: number) {
    return this.dataBaseService.event.findUnique({
      where: { id },
      include: { participants: true },
    });
  }

  async update(id: number, data: UpdateEventDto) {
    const eventExists = await this.findOne(id);

    if (!eventExists) {
      throw new NotFoundException('Event not found');
    }

    const { participants, ...eventData } = data;
    return this.dataBaseService.$transaction(async (dataBaseService) => {
      const event = await dataBaseService.event.update({
        where: { id },
        data: eventData,
      });

      if (participants && participants.length > 0) {
        for (const participant of participants) {
          await dataBaseService.participant.update({
            where: { email: participant.email },
            data: { ...participant, eventId: id },
          });
        }
      }

      return dataBaseService.event.findUnique({
        where: { id: event.id },
        include: { participants: true },
      });
    });
  }

  remove(id: number) {
    const now = new Date();
    return this.dataBaseService.$transaction(async (dataBaseService) => {
      await dataBaseService.event.update({
        where: { id },
        data: { deletedAt: now },
      });

      await dataBaseService.participant.updateMany({
        where: { eventId: id },
        data: { deletedAt: now },
      });
    });
  }
}
