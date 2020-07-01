
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { BaseSqlEntity } from 'src/Common/BaseSqlEntity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseSqlEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty({
    description: 'Name of User',
    example: 'Zainal Arifin'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Username of User',
    example: 'zainalarifin'
  })
  @Column()
  username: string;

  @ApiProperty({
    description: 'Password of User account'
  })
  @Column()
  password: string;

}
