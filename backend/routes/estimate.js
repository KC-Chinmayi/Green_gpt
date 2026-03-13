const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/estimate', async (req, res) => {
  const userInput = req.body.message;

  if (!userInput || userInput.trim() === '') {
    return res.status(400).json({ error: 'Message is required' });
  }

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
        }
      }
    );

    const aiMessage = response.data.text || "No response from Cohere.";
    res.json({ response: aiMessage });

  } catch (error) {
    console.error('Error talking to Cohere:', error.message);
    if (error.response) {
      console.error('🔴 Status:', error.response.status);
      console.error('📝 Data:', error.response.data);
    }
    res.status(500).json({ error: 'Something went wrong while talking to Cohere.' });
  }
});

module.exports = router;

