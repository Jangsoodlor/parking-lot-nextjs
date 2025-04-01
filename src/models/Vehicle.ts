import { prop, Ref } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import { ParkingSpot } from "./ParkingSpot";

type ParkingSpotType = Ref<ParkingSpot>;

export class Vehicle {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop()
  licensePlate: string;

  @prop()
  size: string;
  
    @prop({ ref: () => ParkingSpot }) 
    parkingSpot?: ParkingSpotType;

  @prop({ default: () => new Date() })
  createdAt: Date;
}
