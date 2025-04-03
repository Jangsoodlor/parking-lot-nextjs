import ParkingLot from "@/lib/ParkingLot";
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  spots: []
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(ParkingLot.getInstance().visualiseSpots())
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "GET") {
    await get(req, res);
  }
}
