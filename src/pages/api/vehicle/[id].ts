import { VehicleModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBManager from "@/lib/dbConnect";
import { Vehicle } from "@/models/Vehicle";
type UpdateTodoBody = Partial<Vehicle>;

async function get(res: NextApiResponse, id: string) {
  const todo = await VehicleModel.findById(id);
  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404);
  }
}

async function put(req: NextApiRequest, res: NextApiResponse, id: string) {
  const body = req.body as UpdateTodoBody;
    const todo = await VehicleModel.findById(id);
    if (todo) {
      todo.set({ ...body });
      await todo.save();
      res.status(200).json(todo.toJSON());
    } else {
      res.status(404);
    }
}

async function del(req: NextApiRequest, res: NextApiResponse, id: string) {
  const todo = await VehicleModel.findByIdAndDelete(id);
  if (todo) {
    res.status(200).json(todo.toJSON());
  } else {
    res.status(404);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDBManager.getInstance().connect();
  const id = req.query.id as string;
  if (req.method === "GET") {
    await get(res, id)
  } else if (req.method === "PUT") {
    await put(req, res, id)
  } else if (req.method === "DELETE") {
    await del(req, res, id)
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}