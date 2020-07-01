import { ObjectLiteral, CreateDateColumn } from "typeorm";
type Nullable<T> = T | null;

export class BaseSqlEntity implements ObjectLiteral{
  
  @CreateDateColumn({
    name: 'createdAt',
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
    precision: 0,
  })
  createdAt: Date = new Date();
  
  @CreateDateColumn({
    name: 'updateAt',
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
    precision: 0,
  })
  updateAt: Date = new Date();

  @CreateDateColumn({
    name: 'deletedAt',
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
    precision: 0,
    nullable: true,
    default: null,
  })
  deletedAt: Nullable<Date> = null;

  public delete(): void {
    this.deletedAt = new Date();
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }

}
