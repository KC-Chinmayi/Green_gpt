import { useState } from 'react';
import EmissionChart from '../components/EmissionChart';

export default function Estimate() {
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('km');
  const [method, setMethod] = useState('air');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [emissionHistory, setEmissionHistory] = useState([]);

  const handleEstimate = async () => {
    setLoading(true);
    setReply('');
    setError('');

    const prompt = `I traveled ${distance} ${unit} using a ${method}. Estimate my carbon footprint and give tips to reduce it.`;

    try {
      const aiResponse = await fetch('http://localhost:3001/api/carbon-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: prompt }),
      });

      const aiData = await aiResponse.json();

      if (!aiResponse.ok) {
        throw new Error(aiData.error || 'AI API failed');
      }

      setReply(aiData.reply);

      const transportNames = {
        car: 'Car',
        bus: 'Bus',
        truck: 'Truck',
        bike: '2-Wheeler',
        cycle: 'Cycle',
        train: 'Train',
        ship: 'Ship',
        air: 'Aeroplane',
        ev: 'Electric Vehicle',
      };

      const transport = transportNames[method] || method;

      const mockCarbonKg = parseFloat((Math.random() * 5 + 2).toFixed(2)); // 2–7 kg

      const newEntry = {
        transport: transport,
        emission: mockCarbonKg,
      };

      console.log('Mock chart entry:', newEntry);
      setEmissionHistory((prev) => [...prev, newEntry]);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
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
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          {loading ? 'Estimating...' : 'Estimate Emissions'}
        </button>
      </div>

      {error && (
        <div className="mt-6 text-red-600 font-semibold text-center">{error}</div>
      )}

      {reply && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow max-w-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Suggestions:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{reply}</p>
        </div>
      )}

      {emissionHistory.length > 0 && (
        <EmissionChart data={emissionHistory} />
      )}
    </div>
  );
}

