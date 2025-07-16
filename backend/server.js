// ✅ Step 1: Load .env from the current backend directory explicitly
require('dotenv').config({ path: __dirname + '/.env' });

// ✅ Step 2: Confirm that the API key loaded successfully
if (!process.env.OPENROUTER_API_KEY) {
  console.log("❌ API key NOT loaded. Check your .env file.");
} else {
  console.log("✅ Loaded API key:", process.env.OPENROUTER_API_KEY);
}

const express = require('express');
const cors = require('cors');
const estimateRoute = require('./routes/estimate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', estimateRoute);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

