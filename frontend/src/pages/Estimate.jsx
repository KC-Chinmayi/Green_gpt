import { useState } from 'react';

export default function Estimate() {
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('km');
  const [method, setMethod] = useState('air');
  const [result, setResult] = useState(null);

  const handleEstimate = async () => {
    const response = await fetch('http://localhost:5000/api/estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'shipping',
        distance_value: parseFloat(distance),
        distance_unit: unit,
        transport_method: method
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setResult(data);
    } else {
      alert("Error: " + (data.error?.message || "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🌱 Carbon Emission Estimator</h2>

      <div className="w-full max-w-md bg-gray-100 p-6 rounded-xl shadow-md space-y-4">
        <div>
          <label className="block font-medium mb-1">Distance Travelled:</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="e.g., 100"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Unit of Distance:</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="km">Kilometers</option>
            <option value="mi">Miles</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Transport Method:</label>
         <select
  value={method}
  onChange={(e) => setMethod(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="car">Car</option>
  <option value="bus">Bus</option>
  <option value="truck">Truck</option>
  <option value="bike">2-Wheeler</option>
  <option value="cycle">Cycle</option>
  <option value="train">Train</option>
  <option value="ship">Ship</option>
  <option value="air">Aeroplane</option>
  <option value="ev">Electric Vehicle</option>
</select>

        </div>

        <button
          onClick={handleEstimate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Estimate Emissions
        </button>
      </div>

      {result?.data?.attributes?.carbon_kg && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Estimated CO₂ Emission:
          </h3>
          <p className="text-2xl text-green-700 font-bold mt-2">
            {result.data.attributes.carbon_kg} kg
          </p>
          <p className="text-gray-600 mt-1">
            Method: {result.data.attributes.transport_method}
          </p>
        </div>
      )}
    </div>
  );
}
