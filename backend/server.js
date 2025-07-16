const express = require('express');
const axios = require('axios');
const cors = require('cors');
const estimateRoute = require('./routes/estimate'); // ✅ Add this line
require('dotenv').config();

console.log("🔑 COHERE_API_KEY =", process.env.COHERE_API_KEY ? "✅ Loaded" : "❌ Missing");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', estimateRoute); // ✅ Mount the estimate route here

app.post('/api/carbon-estimate', async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model: "command-r-plus",
        message: userInput,
        temperature: 0.7,
        chat_history: [],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.text;
    res.json({ reply });

  } catch (error) {
    console.error('Cohere API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch response from Cohere' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

