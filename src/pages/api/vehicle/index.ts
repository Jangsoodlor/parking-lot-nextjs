import { VehicleModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBManager from "@/lib/dbConnect";
import ParkingSpot from "@/lib/ParkingSpot";

interface VehicleRequestBody {
  licensePlate: string;
  size: string
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    const vehicles = await VehicleModel.find({}).limit(10).lean();
    res.status(200).json(vehicles);
  }

  const vehicles = await VehicleModel.find(query);
  if (vehicles.length > 0) {
    res.status(200).json(vehicles);
  } else {
    res.status(404);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as VehicleRequestBody;
  if(!body.licensePlate || !body.size) {
    res.status(400).json({error: "Missing License Plate and/or Vehicle Size."})
  }
  const vehicle = new VehicleModel({
    licensePlate: body.licensePlate,
    size: body.size,
  });
  await vehicle.save();
  res.status(200).json(vehicle.toJSON());
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    return res.status(400).json({ error: "Please specify at least 1 query params" });
  }
  const deleted = await VehicleModel.findOneAndDelete(query);
  if (deleted) {
    res.status(200).json(deleted.toJSON());
  } else {
    res.status(404).json({ error: "No matching records found" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await MongoDBManager.getInstance().connect();
  if (req.method === "GET") {
    await get(req, res);    
  } else if (req.method === "POST") {
    await post(req, res);
  } else if (req.method === "DELETE") {
    await del(req, res)

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
