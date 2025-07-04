const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/analysisController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), analyzeResume);

module.exports = router;