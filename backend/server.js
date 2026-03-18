const express = require('express');
const axios = require('axios');
const cors = require('cors');
const estimateRoute = require('./routes/estimate');
require('dotenv').config();

const client = require('prom-client');

// Collect default system metrics (CPU, memory, etc.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

console.log("🔑 COHERE_API_KEY =", process.env.COHERE_API_KEY ? "✅ Loaded" : "❌ Missing");

const app = express();
const PORT = process.env.PORT || 5000;

// 🔥 Request counter with labels
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of API requests',
  labelNames: ['method', 'route', 'status'],
});

// 🔥 Response time with labels
const responseTime = new client.Histogram({
  name: 'http_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

app.use(cors());
app.use(express.json());

// 🔥 Middleware for tracking requests + response time
app.use((req, res, next) => {
  const end = responseTime.startTimer();

  res.on('finish', () => {
    requestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });

  next();
});

// Test route
app.get('/', (req, res) => {
  res.send("🌱 GreenGPT Backend is running successfully");
});

// Routes
app.use('/api', estimateRoute);

// API endpoint
app.post('/api/carbon-estimate', async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model: "command-a-03-2025",
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

// 🔥 Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});