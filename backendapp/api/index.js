const express = require('express');
const multer = require('multer');
const cors = require('cors');
const analyzeRoutes = require('../routes/analyze');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/analyze', analyzeRoutes);

module.exports = app;
