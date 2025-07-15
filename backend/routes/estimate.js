const express = require('express');
const router = express.Router();

router.post('/estimate', (req, res) => {
  const { distance_value, distance_unit, transport_method } = req.body;

  console.log("📦 Mock Estimate Received:", req.body);

  // 🚗 Custom emission factors for each transport type
  const factors = {
    car: 0.18,
    bus: 0.06,
    truck: 0.22,
    bike: 0.09,
    cycle: 0.0,
    train: 0.05,
    ship: 0.03,
    air: 0.25,
    ev: 0.04
  };

  // ✅ Convert miles to kilometers if needed
  let distanceInKm = distance_value;
  if (distance_unit === 'mi') {
    distanceInKm = distance_value * 1.60934;
  }

  // 🧮 Calculate estimated carbon
  const carbon_kg = distanceInKm * (factors[transport_method] || 0.1);

  // 📦 Send mock-style response
  res.json({
    data: {
      id: 'mock123',
      type: 'estimate',
      attributes: {
        distance_value,
        distance_unit,
        transport_method,
        carbon_kg: parseFloat(carbon_kg.toFixed(2))
      }
    }
  });
});

module.exports = router;
