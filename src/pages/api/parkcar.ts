// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ParkingLot from "@/lib/ParkingLot";
import { Vehicle } from "@/lib/Vehicle";
import VehicleFactory from "@/lib/VehicleFactory";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  parkinglot: ParkingLot;
};


interface vehicleBody {
  licensePlate: string;
  size: string
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as vehicleBody
  const vehicle: Vehicle = VehicleFactory.getVehicle(
    body.licensePlate,
    body.size
  )

  const canPark = ParkingLot.getInstance().assignParkingSpot(vehicle)
  return res.status(200).json(canPark)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await post(req, res);
  }
}
