require('dotenv').config(); // MUST be the first line
const express = require('express');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/analyze', analyzeRoutes);

app.listen(PORT, () => {
  console.log("Loaded Gemini API Key:", process.env.GEMINI_API_KEY);
  console.log(`Server running on port ${PORT}`);
});