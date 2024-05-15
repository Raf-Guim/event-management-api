import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({
    description: 'Name of the participant',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the participant',
    example: 'john.doe@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the participant',
    example: '123-456-7890',
  })
  phone?: string;

  @ApiProperty({
    description: 'Event ID of the participant',
    example: 1,
  })
  eventId: number;
}
