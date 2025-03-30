import { getModelForClass } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";

export const VehicleModel = getModelForClass(Vehicle);
