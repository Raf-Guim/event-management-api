import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty({ description: 'Name of the participant', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email of the participant',
    example: 'john.doe@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Phone number of the participant',
    example: '123-456-7890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;
}
