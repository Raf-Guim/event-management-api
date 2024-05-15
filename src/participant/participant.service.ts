import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  create(createParticipantDto: CreateParticipantDto) {
    return this.dataBaseService.participant.create({
      data: createParticipantDto,
    });
  }

  findAll() {
    return this.dataBaseService.participant.findMany();
  }

  findOne(id: number) {
    return this.dataBaseService.participant.findUnique({
      where: { id },
    });
  }

  update(id: number, updateParticipantDto: UpdateParticipantDto) {
    return this.dataBaseService.participant.update({
      where: { id },
      data: updateParticipantDto,
    });
  }

  remove(id: number) {
    return this.dataBaseService.participant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
