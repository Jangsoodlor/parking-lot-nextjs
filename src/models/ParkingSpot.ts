import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class ParkingSpot {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  spotNumber: number;

  @prop()
  level: number;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
