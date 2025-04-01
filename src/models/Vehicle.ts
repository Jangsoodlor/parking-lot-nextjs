import { prop, Ref } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Vehicle {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop({ unique: true, required: true })
  licensePlate: string;

  @prop()
  size: string;
  
  @prop({ default: () => new Date() })
  createdAt: Date;
}
