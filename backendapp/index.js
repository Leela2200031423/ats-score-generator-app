require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Optional: Root route to avoid 404 on browser visits
app.get('/', (req, res) => {
  res.send('✅ Resume Analyzer Backend is running.');
});

app.use('/api/analyze', analyzeRoutes);

app.listen(PORT, () => {
  console.log("Loaded Gemini API Key:", process.env.GEMINI_API_KEY);
  console.log(`Server running on port ${PORT}`);
});
