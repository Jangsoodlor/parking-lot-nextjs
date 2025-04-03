import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    fetch("/api/visualiseSpots")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  function generateTable(parkingLot: string[][]) {
    let rows = [];

    for (let i = 0; i < parkingLot.length; i++) {
      let cells = [<td key={`level-${i}`} className="p-3 font-bold text-black">Level {i + 1}</td>];

      for (let j = 0; j < parkingLot[i].length; j++) {
        cells.push(
          <td key={`spot-${i}-${j}`} className="p-3 text-center border text-black">
            {parkingLot[i][j]}
          </td>
        );
      }

      rows.push(
        <tr key={`row-${i}`} className="even:bg-gray-100 border-b text-black">
          {cells}
        </tr>
      );
    }

    return rows;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Parking Lot Website</h1>
      <Link href="/register" className="text-blue-500 hover:underline mb-4 block">
        Register
      </Link>
      <Link href="/parkcar" className="text-blue-500 hover:underline mb-4 block">
        Park Car
      </Link>
      <Link href="/unpark" className="text-blue-500 hover:underline mb-4 block">
        Unpark
      </Link>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <tbody>{generateTable(data)}</tbody>
        </table>
      </div>
    </div>
  );
}
