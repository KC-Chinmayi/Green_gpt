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
