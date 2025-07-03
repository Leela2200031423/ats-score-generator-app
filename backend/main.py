import os
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()

# ✅ Configure Gemini with your key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# ✅ Initialize model (change made here)
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

# ✅ CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ats-score-generator-app.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    # ✅ Extract text from PDF
    reader = PdfReader(file.file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()

    # ✅ Prepare prompt
    prompt = f"""You are an ATS (Applicant Tracking System). Evaluate this resume for a software developer job and give a detailed score and suggestions:

    Resume:
    {text}
    """

    # ✅ Send to Gemini
    response = model.generate_content(prompt)

    return {"result": response.text}
