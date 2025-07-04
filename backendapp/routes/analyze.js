const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analysisController');

const router = express.Router();

// ✅ Use in-memory storage (because Vercel's filesystem is read-only)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), analyzeResume);

module.exports = router;
