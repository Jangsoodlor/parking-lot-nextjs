// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ParkingLot from "@/lib/ParkingLot";
import { Vehicle } from "@/lib/Vehicle";
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
  const vehicle: Vehicle = Vehicle.getVehicle(
    body.licensePlate,
    body.size
  )

  const canPark = ParkingLot.getInstance().assignParkingSpot(vehicle)
  if(!canPark) {
    return res.status(200).json({"Notice": "The parking lot is full."})
  }
  return res.status(200).json("Car parked successfully.")
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await post(req, res);
  }
}
