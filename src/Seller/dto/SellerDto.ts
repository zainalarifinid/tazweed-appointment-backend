import { ApiProperty } from "@nestjs/swagger";

export class SellerDto {
  @ApiProperty({
    description: 'Name of User',
    example: 'Zainal Arifin'
  })
  name: string;

  @ApiProperty({
    description: 'Username of User',
    example: 'zainalarifin'
  })
  username: string;

  @ApiProperty({
    description: 'Password of User account'
  })
  password: string;
}
