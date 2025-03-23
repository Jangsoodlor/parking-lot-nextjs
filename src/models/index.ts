import { Todo } from "./Todo";
import { getModelForClass } from "@typegoose/typegoose";

export const TodoModel = getModelForClass(Todo);