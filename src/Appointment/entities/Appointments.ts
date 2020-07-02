
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Users } from "src/User/entities/Users";
import { Sellers } from "src/Seller/entities/Sellers";

@Schema()
export class Appointments extends Document {
  
  @Prop({
    type: Types.ObjectId,
    ref: 'Users',
  })
  idUser: Users[];

  @Prop({
    type: Types.ObjectId,
    ref: 'Sellers'
  })
  idSeller: Sellers[];

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startMeeting: Date;

  @Prop()
  endMeeting: Date;

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

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointments);
