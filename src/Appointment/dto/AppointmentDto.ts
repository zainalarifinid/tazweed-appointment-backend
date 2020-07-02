import { ApiProperty } from "@nestjs/swagger";

export class AppointmentDto {
  @ApiProperty({
    description: 'ID of User',
    example: '5efd6bde82ca26041e01363a'
  })
  idUser: string;

  @ApiProperty({
    description: 'ID of Seller',
    example: '5efd6bd782ca26041e013639'
  })
  idSeller: string;

  @ApiProperty({
    description: 'Title of Meeting',
    example: 'Agreement Project'
  })
  title: string;

  @ApiProperty({
    description: 'Description of Meeting',
    example: 'Will invite prospect costumer to sign some agreement project'
  })
  description: string;

  @ApiProperty({
    description: 'Start Meeting',
    example: '2020-07-01T17:30:00.000Z'
  })
  startMeeting: Date;

  @ApiProperty({
    description: 'End Meeting',
    example: '2020-07-01T18:30:00.000Z'
  })
  endMeeting: Date;
}
