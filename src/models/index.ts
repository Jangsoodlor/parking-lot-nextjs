import { Todo } from "./Todo";
import { getModelForClass } from "@typegoose/typegoose";
import { Vehicle } from "./Vehicle";

export const TodoModel = getModelForClass(Todo);
export const VehicleModel = getModelForClass(Vehicle);
