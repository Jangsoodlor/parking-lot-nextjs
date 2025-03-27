import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Vehicle {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  licensePlate: string;

  @prop()
  size: string;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
