import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateParticipantDto } from '../../participant/dto/update-participant.dto';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Birthday Party',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The date of the event',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

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
    type: [UpdateParticipantDto],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateParticipantDto)
  participants?: UpdateParticipantDto[];
}
