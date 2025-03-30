import { VehicleModel } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import MongoDBManager from "@/lib/dbConnect";
import ParkingSpot from "@/lib/ParkingSpot";

interface CreateVehicleBody {
  licensePlate: string;
  size: string
  spot: ParkingSpot | null
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
    if(!body.licensePlate || !body.size) {
      res.status(400).json({error: "Missing License Plate and/or Vehicle Size."})
    }
    console.log(body.licensePlate)
    const vehicle = new VehicleModel({
      licensePlate: body.licensePlate,
      size: body.size,
      spot: body.spot
    });
    await vehicle.save();

    res.status(200).json(vehicle.toJSON());
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
