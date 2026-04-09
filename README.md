📊 AI Reliability Checker

An AI-powered full-stack web application that analyzes text, URLs, and images to determine the reliability of information using NLP techniques and Google Gemini AI.

The system generates a reliability score, explanation, and structured analysis to help users identify trustworthy content.

🚀 Features
🔍 Analyze text, URLs, and images
🤖 AI-powered evaluation using Google Gemini API
📊 Generates reliability score (0–100)
🧾 Provides clear explanation of results
🌐 URL scraping for article content extraction
🖼️ OCR support for image-to-text conversion
⚡ Fast and efficient backend using FastAPI
💻 Clean and responsive React frontend
🏗️ Tech Stack
Frontend
React.js
JavaScript (ES6+)
Axios
CSS
Backend
FastAPI
Python
Google Gemini API
BeautifulSoup (Web Scraping)
pytesseract (OCR)
Pillow
📁 Project Structure
ai-reliability-checker/
│
├── frontend/                 # React App (UI Layer)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputBox.jsx
│   │   │   ├── UploadImage.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── ScoreBar.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
├── backend/                  # FastAPI Server (Core Logic)
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   │
│   │   ├── routes/
│   │   │   └── analyze.py
│   │   │
│   │   ├── services/
│   │   │   ├── gemini.py
│   │   │   ├── scraper.py
│   │   │   └── ocr.py
│   │   │
│   │   ├── models/
│   │   │   └── schema.py
│   │   │
│   │   └── utils/
│   │       └── scoring.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── demo/
├── README.md
├── .env.example
└── .gitignore
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/ai-reliability-checker.git
cd ai-reliability-checker
2️⃣ Backend Setup
Install dependencies
cd backend
pip install -r requirements.txt
Create .env file
GEMINI_API_KEY=your_api_key_here
Run backend server
uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔗 API Endpoint
Analyze Content
POST /analyze
Request Body
{
  "text": "string (optional)",
  "url": "string (optional)",
  "image": "base64 (optional)"
}
Response
{
  "score": 85,
  "label": "Reliable",
  "explanation": "Content is supported by verified sources and shows consistent information patterns."
}
🧠 How It Works
User inputs text / URL / image
Backend processes input:
URL → Extracted using web scraping
Image → Converted to text using OCR
Extracted content is sent to Gemini AI
AI analyzes reliability and returns insights
Scoring system calculates final reliability score
Frontend displays results in a user-friendly UI
📊 Reliability Score System
80 – 100 → Highly Reliable
50 – 79 → Moderately Reliable
0 – 49 → Unreliable

Score is calculated using:

Source quality
Content patterns
AI confidence output
Misinformation indicators
📸 Demo

Add screenshots or video inside the /demo folder:

Home Page UI
Input Analysis Screen
Result Dashboard

Example:

demo/home.png
demo/result.png
🔐 Environment Variables

Backend .env file:

GEMINI_API_KEY=your_api_key_here
📦 Requirements
Backend (requirements.txt)
fastapi
uvicorn
requests
beautifulsoup4
python-dotenv
pytesseract
pillow
