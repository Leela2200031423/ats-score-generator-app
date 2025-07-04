const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    const resumeText = data.text;
    fs.unlinkSync(req.file.path); // Clean up uploaded file

    const jobDescription = `Full Stack Developer with experience in React, Node.js, and AI integrations.`;

    const prompt = `
Compare the resume and job description, and return the following:
**Overall Score:** (out of 100)
**Strengths:**
- Bullet points of strengths

**Weaknesses:**
- Bullet points of weaknesses

**Suggestions for Improvement:**
- Suggestions to improve resume

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || "No response from Gemini";

    res.json({ result: text });
  } catch (err) {
    console.error('Gemini Error:', err);
    res.status(500).json({ error: 'Something went wrong with Gemini API' });
  }
};
