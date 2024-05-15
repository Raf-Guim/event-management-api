import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event by id' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by id' })
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
