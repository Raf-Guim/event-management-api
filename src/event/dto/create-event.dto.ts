import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateParticipantDto } from '../../participant/dto/create-participant.dto';

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Birthday Party',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The date of the event',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Come celebrate my birthday!',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Location of the event',
    example: '123 Fake St, Springfield, IL 62701',
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: 'The participants of the event',
    type: [CreateParticipantDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateParticipantDto)
  participants: CreateParticipantDto[];
}
