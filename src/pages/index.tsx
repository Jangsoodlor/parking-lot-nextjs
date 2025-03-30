import Link from "next/link";

export default function Home() {
  return (
  <div>
    <h1>Welcome to Parking Lot Website</h1>
    <Link href="/parkingspace">See vacant parking space</Link>
  </div>
);
}
