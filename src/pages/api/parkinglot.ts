// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ParkingLot from "@/lib/ParkingLot";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  parkinglot: ParkingLot;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ parkinglot: ParkingLot.getInstance() });
}
