import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 px-4 relative overflow-hidden">
      {/* 🌿 Floating background icons */}
<div className="absolute top-8 left-8 text-green-500 text-8xl select-none animate-bounce-slow opacity-30">
  🍃
</div>
<div className="absolute bottom-14 right-10 text-green-400 text-7xl select-none animate-spin-slow opacity-30">
  🌍
</div>


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-6xl font-extrabold text-green-700 mb-6 tracking-tight leading-tight"
        >
          🌱 GreenGPT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl text-gray-700 mb-8"
        >
          Estimate your carbon footprint from daily activities like travel and electricity use.
          <br />
          Get smart AI-powered suggestions to reduce your environmental impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            to="/estimate"
            className="inline-block bg-green-600 hover:bg-green-700 transition duration-300 text-white text-lg font-medium px-8 py-3 rounded-full shadow-md"
          >
            Start Estimating →
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

