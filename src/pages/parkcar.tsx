import { FormEvent, useState } from 'react'

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = {
      licensePlate: formData.get("licensePlate")

    }
  }

  

  return(
    <div className="p-4">
      <form onSubmit={onSubmit}>
        <legend>Input your license plate here</legend>
        <input type="text" name="licensePlate" className="bg-yellow-900" placeholder="license plate" required/>
        <button type="submit" className="bg-green-900">Submit</button>
      </form>

    </div>
  )

}
