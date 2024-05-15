import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ParticipantService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  async create(data: CreateParticipantDto, eventId: number) {
    const participantExists = await this.checkParticipantExists(data.email);

    if (participantExists) {
      throw new ConflictException(
        'Participant with that email already exists!',
      );
    }

    return this.dataBaseService.participant.create({
      data: {
        ...data,
        eventId,
      },
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

  async update(id: number, data: UpdateParticipantDto) {
    const participantExists = await this.checkParticipantExists(data.email);

    if (!participantExists) {
      throw new NotFoundException(
        'Participant with that email does not exist!',
      );
    }

    return this.dataBaseService.participant.update({
      where: { id },
      data,
    });
  }

  async updateWithEmail(email: string, data: UpdateParticipantDto) {
    const participantExists = await this.checkParticipantExists(email);

    if (!participantExists) {
      throw new NotFoundException(
        'Participant with that email does not exist!',
      );
    }

    return this.dataBaseService.participant.update({
      where: { email },
      data,
    });
  }

  async remove(id: number) {
    const participantExists = await this.findOne(id);

    if (!participantExists) {
      throw new NotFoundException('Participant with that id does not exist!');
    }

    return this.dataBaseService.participant.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private checkParticipantExists(email: string) {
    return this.dataBaseService.participant.findUnique({
      where: { email },
    });
  }
}
