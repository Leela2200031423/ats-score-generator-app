const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analysisController');

const router = express.Router();

// ✅ Use in-memory storage to avoid file system error on Vercel
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), analyzeResume);

module.exports = router;
