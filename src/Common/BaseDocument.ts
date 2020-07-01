
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
type Nullable<T> = T | null;

export class BaseDocument extends Document{
  
  @Prop()
  createdAt: Date = new Date();

  @Prop()
  updateAt: Date = new Date();

  @Prop()
  deletedAt: Nullable<Date> = null;

  public delete(): void {
    this.deletedAt = new Date();
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  // @CreateDateColumn({
  //   name: 'createdAt',
  //   type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
  //   precision: 0,
  // })
  // createdAt: Date = new Date();
  
  // @CreateDateColumn({
  //   name: 'updateAt',
  //   type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
  //   precision: 0,
  // })
  // updateAt: Date = new Date();

  // @CreateDateColumn({
  //   name: 'deletedAt',
  //   type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
  //   precision: 0,
  //   nullable: true,
  //   default: null,
  // })
  // deletedAt: Nullable<Date> = null;

  // public delete(): void {
  //   this.deletedAt = new Date();
  // }

  // public isDeleted(): boolean {
  //   return this.deletedAt !== null;
  // }

}

export const BaseDocumentSchema = SchemaFactory.createForClass(BaseDocument);
