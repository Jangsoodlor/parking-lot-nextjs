// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ParkingLot from "@/lib/ParkingLot";
import { Vehicle } from "@/lib/Vehicle";
import VehicleCreator from "@/lib/VehicleCreator";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  parkinglot: ParkingLot;
};


interface vehicleBody {
  licensePlate: string;
  size: string
  action: string
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as vehicleBody
  const vehicle: Vehicle = VehicleCreator.getVehicle(
    body.licensePlate,
    body.size
  )

  if(body.action === "park") {
    const canPark = ParkingLot.getInstance().assignParkingSpot(vehicle)
    return res.status(200).json(canPark)
  }
  return res.status(200).json(ParkingLot.getInstance().removeVehcile(body.licensePlate))
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(ParkingLot.getInstance().visualiseSpots())
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await post(req, res);
  } else if(req.method === "GET") {
    await get(req, res)
  } else {
    return res.status(404)
  }
}
