import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# List available models and their supported methods
for model in genai.list_models():
    print(f"{model.name} => {model.supported_generation_methods}")
