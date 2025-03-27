import type { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/vehicle')
  const data = await res.json()
  return {props: {data}}
}


export default function Page({data,} : InferGetServerSidePropsType<typeof getServerSideProps> ) {
  return (
    <div>
      Welcome to Parking Lot
      {data.map((thing: { licensePlate: string }, index: number) => (
        <p key={index}>{thing.licensePlate}</p>
      ))}

    </div>
  )
}
