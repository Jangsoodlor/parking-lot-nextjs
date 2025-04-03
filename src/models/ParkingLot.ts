import ParkingLot from "@/lib/ParkingLot";
import { prop, Ref } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

export class ParkingLotM {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop({ unique: true, required: true })
  licensePlate: ParkingLot;
}

export default ParkingLotM