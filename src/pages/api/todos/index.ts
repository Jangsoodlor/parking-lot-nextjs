import { TodoModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBManager from "@/lib/dbConnect";
interface CreateTodoBody {
  title: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDBManager.getInstance().connect();
  if (req.method === "GET") {
    // for retrieving todos list
    const todos = await TodoModel.find({}).limit(10).lean();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // creating a single todo
    const body = req.body as CreateTodoBody;
    const todo = new TodoModel({
      title: body.title,
      description: body.description,
    });
    await todo.save();

    res.status(200).json(todo.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}