
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sellers extends Document {

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

}

export const SellerSchema = SchemaFactory.createForClass(Sellers);
