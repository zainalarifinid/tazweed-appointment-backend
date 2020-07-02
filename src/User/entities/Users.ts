
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Appointments } from 'src/Appointment/entities/Appointments';

@Schema()
export class Users extends Document {

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: new Date(),
  })
  createdAt: Date = new Date();

  @Prop({
    default: new Date(),
  })
  updateAt: Date = new Date();

  @Prop({
    default: new Date(null),
  })
  deletedAt: Date = new Date(null);

  public delete(): void {
    this.deletedAt = new Date();
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  @Prop({
    type: Types.ObjectId,
    ref: 'Appointments',
    default: [],
  })
  appointments: Appointments[];

}

export const UserSchema = SchemaFactory.createForClass(Users);
