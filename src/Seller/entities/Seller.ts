
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { BaseSqlEntity } from 'src/Common/BaseSqlEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Seller extends BaseSqlEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty({
    description: 'Name of Seller',
    example: 'Zainal Arifin'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Username of Seller',
    example: 'zainalarifin'
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'Password of Seller account'
  })
  @Column()
  password: string;

}