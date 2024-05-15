import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Birthday Party',
  })
  name: string;

  @ApiProperty({
    description: 'Date of the event',
    example: '31-12-2021',
  })
  date: Date;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Come celebrate my birthday!',
  })
  description?: string;

  @ApiProperty({
    description: 'Location of the event',
    example: '123 Fake St, Springfield, IL 62701',
  })
  location?: string;
}
