import { useState } from 'react';

export default function Estimate() {
  const [distance, setDistance] = useState('');
  const [transport, setTransport] = useState('car');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      distance_km: Number(distance),
      transport_type: transport,
    };
    console.log(payload); // Will later be sent to Climatiq API
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Carbon Estimator</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="number"
          placeholder="Distance (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="plane">Plane</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Estimate Emissions
        </button>
      </form>
    </div>
  );
}
