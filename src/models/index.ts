import { getModelForClass } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";
import ParkingLotM from "./ParkingLot";

export const VehicleModel = getModelForClass(Vehicle);
export const ParkingLotModel = getModelForClass(ParkingLotM)