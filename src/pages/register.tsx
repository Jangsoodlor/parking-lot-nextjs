import { FormEvent, useState } from 'react'
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const data = {
      licensePlate: formData.get("licensePlate"),
      size: formData.get("size"),
      spot: null
    }
    console.log(data)
    await fetch('/api/vehicle', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", // Sending as JSON
      },
      body: JSON.stringify(data),
    })
  }

  const [size, setSize] = useState("Compact");

  return (
    <div className="p-4 justify-between">
      <h1 className="font-extrabold text-4xl">Enter your car's information</h1>
      <form onSubmit={onSubmit}>
        <legend>Input yor license plate:</legend>
        <input type="text" name="licensePlate" placeholder="Insert License Plate here" className="bg-yellow-900" required/>
        <fieldset>
          <legend>Select Vehicle Size:</legend>

          <label>
            <input
              type="radio"
              name="size"
              value="Motorcycle"
              checked={size === "Motorcycle"}
              onChange={() => setSize("Motorcycle")}
            />
            Motorcycle
          </label>

          <label>
            <input
              type="radio"
              name="size"
              value="Compact"
              checked={size === "Compact"}
              onChange={() => setSize("Compact")}
            />
            Compact
          </label>

          <label>
            <input
              type="radio"
              name="size"
              value="Large"
              checked={size === "Large"}
              onChange={() => setSize("Large")}
            />
            Large
          </label>
        </fieldset>
        <button type="submit" className="bg-green-900">Submit</button>
      </form>

    </div>
  )
}
