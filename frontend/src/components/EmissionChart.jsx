import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

export default function EmissionChart({ data }) {
  return (
    <div className="w-full max-w-2xl mt-10 bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📊 Emission History</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="transport" />
          <YAxis label={{ value: 'CO₂ (kg)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="emission" fill="#22c55e" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
