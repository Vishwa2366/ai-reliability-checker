# 📊 AI Reliability Checker

An AI-powered full-stack web application that analyzes **text, URLs, and images** to determine the reliability of information using NLP techniques and Google Gemini AI.

The system generates a **reliability score, explanation, and structured analysis** to help users identify trustworthy content.

---

# 🚀 Features

- 🔍 Analyze text, URLs, and images  
- 🤖 AI-powered evaluation using Google Gemini API  
- 📊 Reliability score (0–100)  
- 🧾 Clear explanations for results  
- 🌐 URL scraping for content extraction  
- 🖼️ OCR support for image-to-text conversion  
- ⚡ Fast backend using FastAPI  
- 💻 Responsive React frontend  

---

# 🏗️ Tech Stack

### 🎨 Frontend
- React.js
- JavaScript (ES6+)
- Axios
- CSS

### ⚙️ Backend
- FastAPI
- Python
- Google Gemini API
- BeautifulSoup (Web Scraping)
- pytesseract (OCR)
- Pillow

---

# 📁 Project Structure
# 📊 AI Reliability Checker

An AI-powered full-stack web application that analyzes **text, URLs, and images** to determine the reliability of information using NLP techniques and Google Gemini AI.

The system generates a **reliability score, explanation, and structured analysis** to help users identify trustworthy content.

---

# 🚀 Features

- 🔍 Analyze text, URLs, and images  
- 🤖 AI-powered evaluation using Google Gemini API  
- 📊 Reliability score (0–100)  
- 🧾 Clear explanations for results  
- 🌐 URL scraping for content extraction  
- 🖼️ OCR support for image-to-text conversion  
- ⚡ Fast backend using FastAPI  
- 💻 Responsive React frontend  

---

# 🏗️ Tech Stack

### 🎨 Frontend
- React.js
- JavaScript (ES6+)
- Axios
- CSS

### ⚙️ Backend
- FastAPI
- Python
- Google Gemini API
- BeautifulSoup (Web Scraping)
- pytesseract (OCR)
- Pillow

---

# 📁 Project Structure
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
│   │   │   └── api.js        # Axios calls to backend
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js    # Score calculations, formatting
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   └── package.json
│
├── backend/                  # FastAPI Server (Core Logic)
│   ├── app/
│   │   ├── main.py           # Entry point
│   │   │
│   │   ├── routes/
│   │   │   └── analyze.py    # API endpoint
│   │   │
│   │   ├── services/
│   │   │   ├── gemini.py     # Gemini API call
│   │   │   ├── scraper.py    # URL text extraction
│   │   │   └── ocr.py        # Image → text (optional)
│   │   │
│   │   ├── models/
│   │   │   └── schema.py     # Request/Response models
│   │   │
│   │   ├── utils/
│   │   │   └── scoring.py    # Final score formula
│   │   │
│   │   └── config.py         # Env variables
│   │
│   ├── requirements.txt
│   └── .env
│
├── README.md                 # Submission-ready documentation
├── .env.example              # API key placeholders
├── .gitignore
└── demo/                     # Screenshots + video
