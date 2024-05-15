import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Participant')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new participant' })
  create(
    @Body() createParticipantDto: CreateParticipantDto,
    @Body('eventId') eventId: number,
  ) {
    return this.participantService.create(createParticipantDto, eventId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by id' })
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a participant by id' })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(+id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a participant by id' })
  remove(@Param('id') id: string) {
    return this.participantService.remove(+id);
  }
}
