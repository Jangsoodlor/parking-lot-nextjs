import { FormEvent, useState } from 'react'

export default function Page() {

  async function parkCar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const vehicleResponse = await fetch(`/api/vehicle/?licensePlate=${formData.get("licensePlate")}`)
    if(vehicleResponse.status === 404) {
      setModalContent(JSON.stringify("Please register your vehicle first."))
      setModalOpen(true)
      return;
    }
    const vehicle = await vehicleResponse.json()
    const response = await fetch('/api/parkcar', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        licensePlate: vehicle[0].licensePlate,
        size: vehicle[0].size,
        action: "unpark"
      })
    })
    const result = await response.json()
    setModalContent(JSON.stringify(result, null, 2))
    setModalOpen(true)
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("")

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Unpark Car</h1>
      <form onSubmit={parkCar}>
        <legend>Input your license plate here</legend>
        <input type="text" name="licensePlate" className="bg-yellow-900" placeholder="license plate" required />
        <button type="submit" className="bg-green-900">Submit</button>
      </form>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Submission Result</h2>
            <pre className="bg-gray-700 p-4 rounded text-sm overflow-auto max-h-60">{modalContent}</pre>
            <button onClick={() => setModalOpen(false)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  )

}
