import { VehicleModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBManager from "@/lib/dbConnect";
interface CreateVehicleBody {
  licensePlate: string;
  size: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDBManager.getInstance().connect();
  if (req.method === "GET") {
    const vehicles = await VehicleModel.find({}).limit(10).lean();
    res.status(200).json(vehicles);

    
  } else if (req.method === "POST") {
    const body = req.body as CreateVehicleBody;
    const vehicle = new VehicleModel({
      licensePlate: body.licensePlate,
      size: body.size,
    });
    await vehicle.save();

    res.status(200).json(vehicle.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
