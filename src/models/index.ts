import { getModelForClass } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";
import { ParkingSpot } from "./ParkingSpot";

export const VehicleModel = getModelForClass(Vehicle);
export const ParkingSpotModel = getModelForClass(ParkingSpot)