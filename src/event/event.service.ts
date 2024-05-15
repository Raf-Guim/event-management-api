import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EventService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  create(createEventDto: CreateEventDto) {
    return this.dataBaseService.event.create({
      data: createEventDto,
    });
  }

  findAll() {
    return this.dataBaseService.event.findMany({
      include: { Participant: true },
    });
  }

  findOne(id: number) {
    return this.dataBaseService.event.findUnique({
      where: { id },
      include: { Participant: true },
    });
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return this.dataBaseService.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  remove(id: number) {
    return this.dataBaseService.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
