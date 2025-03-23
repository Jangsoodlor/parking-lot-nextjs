import type { InferGetServerSidePropsType } from 'next'

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/hello')
  const data = await res.json()
  return {props: {data}}
}


export default function Page({data,} : InferGetServerSidePropsType<typeof getServerSideProps> ) {
  return (
    <div>
      Parking Lot Let's Goooooo {data.name}!
    </div>
  )
}
