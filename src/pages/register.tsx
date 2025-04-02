import { FormEvent, useState } from 'react'
 
export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const data = {
      licensePlate: formData.get("licensePlate"),
      size: formData.get("size"),
    }
    const response = await fetch('/api/vehicle', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", // Sending as JSON
      },
      body: JSON.stringify(data),
    })
    if(response.status === 404 || response.status === 500) {
      setModalContent("Error: Cannot create vehicle.")
    }
    else {
      const result = await response.json();
      setModalContent(JSON.stringify(result, null, 2));
    }
    setModalOpen(true);
  }

  const [size, setSize] = useState("Compact");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

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
