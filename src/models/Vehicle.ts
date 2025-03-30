import ParkingSpot from "@/lib/ParkingSpot";
import { prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class Vehicle {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  licensePlate: string;

  @prop({ required: true, unique: true })
  size: string;

  @prop({ required: true })
  spot: ParkingSpot | null;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
