
import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { BaseSqlEntity } from 'src/Common/BaseSqlEntity';

@Entity()
export class User extends BaseSqlEntity {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

}
