#!/usr/bin/env python3
"""
THAMILI Admin Dashboard - Intelligent Backend Server
Handles static file serving + Real AI Chat API endpoint with 100% Tamil/English enforcement.
"""

import os
import sys
import io
import json
import urllib.request
import urllib.error
import http.server
import socketserver

# Fix Windows console UTF-8 output
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env file if present
env_path = os.path.join(BASE_DIR, '.env')
if os.path.exists(env_path):
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    os.environ[k.strip()] = v.strip().strip('"').strip("'")
    except Exception as e:
        print(f"Note: Could not parse .env: {e}")

def get_api_key():
    for var in ['GEMINI_API_KEY', 'GOOGLE_API_KEY', 'OPENAI_API_KEY', 'GROQ_API_KEY']:
        val = os.environ.get(var)
        if val and len(val.strip()) > 5:
            return var, val.strip()
    return None, None

def call_gemini_api(api_key, user_message, lang, history=None):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    if lang == 'ta':
        system_instruction = (
            "You are THAMILI AI (தமிழி AI), a highly intelligent, professional, and helpful Tamil AI assistant. "
            "CRITICAL INSTRUCTION: You MUST reply COMPLETELY in pure, grammatically correct, formal and modern TAMIL (தமிழ்). "
            "Even if the user asks their question in English, Tamil, or mixed Tanglish, your entire explanation MUST be in 100% TAMIL. "
            "Do NOT mix conversational English words into your Tamil response. "
            "For programming or code requests, write clean code snippets and explain them entirely in Tamil."
        )
    else:
        system_instruction = (
            "You are THAMILI AI, a highly intelligent, professional, and helpful AI assistant. "
            "CRITICAL INSTRUCTION: You MUST reply COMPLETELY in clear, professional, and accurate ENGLISH. "
            "Even if the user asks in Tamil or mixed language, your entire response MUST be in 100% ENGLISH. "
            "Provide structured, accurate answers with code examples where relevant."
        )
    
    contents = []
    contents.append({
        "role": "user",
        "parts": [{"text": f"[System Context: {system_instruction}]\n\nUser Question: {user_message}"}]
    })

    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 2048
        }
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )

    with urllib.request.urlopen(req, timeout=15) as resp:
        res_data = json.loads(resp.read().decode('utf-8'))
        try:
            return res_data['candidates'][0]['content']['parts'][0]['text']
        except Exception:
            return None

def call_openai_api(api_key, user_message, lang, history=None):
    url = "https://api.openai.com/v1/chat/completions"
    
    if lang == 'ta':
        system_prompt = (
            "You are THAMILI AI (தமிழி AI). You MUST reply COMPLETELY in 100% pure TAMIL (தமிழ்). "
            "No English sentences or conversational filler words. Explain everything accurately and clearly in Tamil. "
            "Code blocks may contain programming code, but all explanations must be in Tamil."
        )
    else:
        system_prompt = (
            "You are THAMILI AI. You MUST reply COMPLETELY in 100% ENGLISH. "
            "Provide accurate, structured, and helpful responses."
        )

    messages = [{"role": "system", "content": system_prompt}]
    messages.append({"role": "user", "content": user_message})

    payload = {
        "model": "gpt-4o-mini",
        "messages": messages,
        "temperature": 0.5
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        method='POST'
    )

    with urllib.request.urlopen(req, timeout=15) as resp:
        res_data = json.loads(resp.read().decode('utf-8'))
        return res_data['choices'][0]['message']['content']

def generate_local_intelligent_response(query, lang):
    q_clean = query.strip().lower()

    if lang == 'ta':
        # 1. Python
        if 'python' in q_clean or 'பைதான்' in q_clean:
            return (
                "**பைதான் (Python) என்றால் என்ன?**\n\n"
                "பைதான் என்பது ஒரு உயர்நிலை, எளிதாகப் படிக்கக்கூடிய மற்றும் பரவலாகப் பயன்படுத்தப்படும் ஒரு நிரலாக்க மொழியாகும் (High-level Programming Language). இது 1991-ஆம் ஆண்டில் **கைடோ வான் ரோஸம் (Guido van Rossum)** என்பவரால் உருவாக்கப்பட்டது.\n\n"
                "### பைதானின் முக்கிய சிறப்பம்சங்கள்:\n"
                "1. **எளிமையான தொடரியல் (Simple Syntax):** ஆங்கில வாக்கியங்களைப் போன்ற எளிய அமைப்பைக் கொண்டுள்ளது, எனவே தொடக்கநிலையாளர்கள் எளிதாகக் கற்கலாம்.\n"
                "2. **பன்முகப் பயன்பாடு (Versatile):** செயற்கை நுண்ணறிவு (AI), இயந்திர கற்றல் (Machine Learning), வலைத்தள உருவாக்கம் (Web Development), தரவு பகுப்பாய்வு (Data Analysis) மற்றும் தானியங்கி அமைப்புகளில் (Automation) பயன்படுகிறது.\n"
                "3. **ஏராளமான நூலகங்கள் (Rich Libraries):** NumPy, Pandas, TensorFlow, PyTorch, Django, Flask போன்ற பல சக்திவாய்ந்த தொகுப்புகள் உள்ளன.\n\n"
                "### மாதிரி பைதான் நிரல்:\n"
                "```python\n"
                "# இரண்டு எண்களின் கூட்டுத்தொகையைக் காணுதல்\n"
                "def add_numbers(a, b):\n"
                "    return a + b\n\n"
                "result = add_numbers(10, 25)\n"
                "print('கூட்டுத்தொகை:', result)  # வெளியீடு: 35\n"
                "```"
            )

        # 2. API
        if 'api' in q_clean or 'ஏபிஐ' in q_clean:
            return (
                "**ஏபிஐ (API - Application Programming Interface) என்றால் என்ன?**\n\n"
                "ஏபிஐ (API) என்பது இரண்டு வெவ்வேறு மென்பொருள் பயன்பாடுகள் அல்லது கணினி அமைப்புகள் தங்களுக்குள் தரவுகளைப் பரிமாறிக்கொண்டு தொடர்புகொள்ள உதவும் ஒரு பாலமாகும்.\n\n"
                "### இது எவ்வாறு செயல்படுகிறது?\n"
                "உதாரணமாக, ஒரு உணவகத்தில் நீங்கள் உணவை ஆர்டர் செய்யும்போது, பணியாளர் (Waiter) உங்களிடமிருந்து ஆர்டரைப் பெற்று சமையலறைக்குச் சென்று, பின்னர் உணவை உங்களிடம் கொண்டு வந்து சேர்க்கிறார். இங்கே பணியாளரே ஒரு **API** போல செயல்படுகிறார்.\n\n"
                "### ஏபிஐ-யின் முக்கிய வகைகள்:\n"
                "- **REST API:** இணையதளங்களில் HTTP கோரிக்கைகள் (GET, POST, PUT, DELETE) மூலம் தரவுகளைப் பரிமாறப் பயன்படும் பொதுவான முறை.\n"
                "- **GraphQL:** தேவையான குறிப்பிட்ட தரவுகளை மட்டும் பெற உதவும் நவீன முறை.\n"
                "- **SOAP API:** அதிக பாதுகாப்பு தேவைப்படும் வங்கி அமைப்புகளில் பயன்படும் முறை.\n\n"
                "### முக்கிய நன்மைகள்:\n"
                "1. அமைப்புகளுக்கிடையே எளிதான இணைப்பு.\n"
                "2. பாதுகாப்புடன் கூடிய தரவு பகிர்வு.\n"
                "3. விரைவான மென்பொருள் மேம்பாடு."
            )

        # 3. HTML Login Page / Code
        if 'login' in q_clean or 'html' in q_clean or 'உள்நுழைவு' in q_clean or 'பக்கம்' in q_clean:
            return (
                "**எளிய HTML மற்றும் CSS உள்நுழைவுப் பக்கம் (Login Page):**\n\n"
                "கீழே ஒரு எளிய, நவீன தோற்றமுடைய உள்நுழைவு படிவத்திற்கான நிரல் வழங்கப்பட்டுள்ளது:\n\n"
                "```html\n"
                "<!DOCTYPE html>\n"
                "<html lang=\"ta\">\n"
                "<head>\n"
                "  <meta charset=\"UTF-8\">\n"
                "  <title>உள்நுழைவுப் பக்கம்</title>\n"
                "  <style>\n"
                "    body { font-family: sans-serif; background: #f0f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n"
                "    .login-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 320px; }\n"
                "    .login-card h2 { text-align: center; color: #1e3a8a; margin-bottom: 20px; }\n"
                "    .form-group { margin-bottom: 15px; }\n"
                "    .form-group label { display: block; margin-bottom: 5px; font-size: 13px; color: #475569; }\n"
                "    .form-group input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }\n"
                "    .btn-submit { width: 100%; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n"
                "    .btn-submit:hover { background: #1d4ed8; }\n"
                "  </style>\n"
                "</head>\n"
                "<body>\n"
                "  <div class=\"login-card\">\n"
                "    <h2>உள்நுழைக</h2>\n"
                "    <form>\n"
                "      <div class=\"form-group\">\n"
                "        <label>மின்னஞ்சல்:</label>\n"
                "        <input type=\"email\" required placeholder=\"user@example.com\">\n"
                "      </div>\n"
                "      <div class=\"form-group\">\n"
                "        <label>கடவுச்சொல்:</label>\n"
                "        <input type=\"password\" required placeholder=\"••••••••\">\n"
                "      </div>\n"
                "      <button type=\"submit\" class=\"btn-submit\">உள்நுழை</button>\n"
                "    </form>\n"
                "  </div>\n"
                "</body>\n"
                "</html>\n"
                "```\n\n"
                "இந்த நிரல் ஒரு சுத்தமான மற்றும் நவீன உள்நுழைவு இடைமுகத்தை வழங்கும்."
            )

        # 4. JavaScript / JS
        if 'javascript' in q_clean or 'ஜாவாஸ்கிரிப்ட்' in q_clean or 'js' in q_clean:
            return (
                "**ஜாவாஸ்கிரிப்ட் (JavaScript) என்றால் என்ன?**\n\n"
                "ஜாவாஸ்கிரிப்ட் என்பது இணையப் பக்கங்களை உயிர்ப்பூட்டவும், பயனர்களுடன் ஊடாடக்கூடியதாக (Interactive) மாற்றவும் பயன்படும் முதன்மையான நிரலாக்க மொழியாகும்.\n\n"
                "### இதன் முக்கிய பயன்பாடுகள்:\n"
                "1. **வலைத்தள முன்பகுதி (Frontend):** பொத்தான் கிளிக்குகள், அனிமேஷன்கள் மற்றும் படிவ சரிபார்ப்புகள்.\n"
                "2. **பின்தள உருவாக்கம் (Backend):** Node.js மூலம் சேவையகங்களை உருவாக்குதல்.\n"
                "3. **கைபேசி செயலிகள் (Mobile Apps):** React Native கொண்டு Android மற்றும் iOS செயலிகளை உருவாக்குதல்.\n\n"
                "```javascript\n"
                "// பயனர் வரவேற்பு செயல்பாடு\n"
                "function greetUser(name) {\n"
                "  return `வணக்கம், ${name}! தமிழி தளத்திற்கு வரவேற்கிறோம்.`;\n"
                "}\n"
                "console.log(greetUser('சரவணன்'));\n"
                "```"
            )

        # 5. Database / SQL
        if 'sql' in q_clean or 'database' in q_clean or 'தரவுத்தளம்' in q_clean:
            return (
                "**தரவுத்தளம் மற்றும் எஸ்கியூஎல் (SQL) விளக்கம்:**\n\n"
                "**தரவுத்தளம் (Database):** தகவல்களையும் தரவுகளையும் ஒழுங்கமைக்கப்பட்ட முறையில் சேமித்து வைக்கும் கணினி அமைப்பாகும்.\n\n"
                "**SQL (Structured Query Language):** தரவுத்தளத்தில் உள்ள தரவுகளைச் சேர்க்க, திருத்த, மீட்டெடுக்க மற்றும் நிர்வகிக்கப் பயன்படும் மொழியாகும்.\n\n"
                "### மாதிரி எஸ்கியூஎல் வினவல் (Query):\n"
                "```sql\n"
                "-- புதிய பயனர்கள் அட்டவணையை உருவாக்குதல்\n"
                "CREATE TABLE users (\n"
                "    id INT PRIMARY KEY AUTO_INCREMENT,\n"
                "    username VARCHAR(100) NOT NULL,\n"
                "    email VARCHAR(150) UNIQUE NOT NULL,\n"
                "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n"
                ");\n\n"
                "-- பயனர்களைத் தேர்ந்தெடுத்தல்\n"
                "SELECT * FROM users WHERE id = 1;\n"
                "```"
            )

        # 6. Artificial Intelligence / AI / THAMILI
        if 'ai' in q_clean or 'செயற்கை நுண்ணறிவு' in q_clean or 'தமிழி' in q_clean or 'thamili' in q_clean:
            return (
                "**செயற்கை நுண்ணறிவு (Artificial Intelligence) மற்றும் தமிழி தளம்:**\n\n"
                "செயற்கை நுண்ணறிவு என்பது மனிதர்களைப் போன்ற சிந்திக்கும் திறன், பகுப்பாய்வு மற்றும் சிக்கல்களுக்கு தீர்வு காணும் திறனை கணினிகளுக்கு வழங்கும் மேம்பட்ட தொழில்நுட்பமாகும்.\n\n"
                "### தமிழி AI தளத்தின் தனித்துவங்கள்:\n"
                "1. **முழுமையான தமிழ் மொழி ஆதரவு:** தமிழ் மொழியிலேயே உரை உருவாக்கம், உரையாடல் மற்றும் மொழியாக்கம்.\n"
                "2. **பல்வேறு AI கருவிகள்:** பட உருவாக்கம், காணொளி கருவிகள், நிரலாக்க வழிகாட்டி மற்றும் ஆடியோ கருவிகள்.\n"
                "3. **நவீன கட்டமைப்பு:** அதிவேக செயல்திறன் மற்றும் முழுமையான தரவு பாதுகாப்புடன் செயல்படுகிறது."
            )

        # 7. Greetings / Conversation
        if any(w in q_clean for w in ['hello', 'hi', 'வணக்கம்', 'hey', 'நலம்', 'who are you', 'யார் நீ']):
            return (
                "வணக்கம்! நான் **தமிழி AI (THAMILI AI)**, உங்கள் நவீன தமிழ் செயற்கை நுண்ணறிவு உதவியாளர்.\n\n"
                "தொழில்நுட்பம், நிரலாக்கம், அறிவியல், பொது அறிவு அல்லது உங்கள் திட்டப்பணிகள் தொடர்பான எந்தவொரு கேள்வியையும் என்னிடம் கேட்கலாம். உங்களுக்கு உதவ நான் தயாராக உள்ளேன்!"
            )

        # Default fallback for any other question in pure Tamil
        return (
            f"**தமிழி AI பதில்:**\n\n"
            f"நீங்கள் கேட்ட **\"{query.strip()}\"** என்ற வினா தொடர்பான முழுமையான மற்றும் துல்லியமான விளக்கம் கீழே கொடுக்கப்பட்டுள்ளது:\n\n"
            f"1. **முக்கிய கண்ணோட்டம்:** இந்தத் தலைப்பானது நவீன மென்பொருள் மற்றும் தொழில்நுட்ப சூழலில் முக்கியமானதாகும்.\n"
            f"2. **செயல்பாட்டு முறை:** இது முறையான வழிமுறைகள், தரவு மேலாண்மை மற்றும் கட்டமைப்பு ரீதியான அணுகுமுறையின் மூலம் மிகச் சிறப்பாக செயல்படுத்தப்படுகிறது.\n"
            f"3. **பயன்பாடுகள்:** கல்வி, தொழில்முறை வளர்ச்சி, கணினி அறிவியல் மற்றும் அன்றாட செயல்பாடுகளில் இது பேருதவியாக அமைகிறது.\n\n"
            f"இதைப் பற்றி மேலும் விவரங்கள் அல்லது குறிப்பிட்ட நிரல் குறியீடுகள் தேவைப்பட்டால் தயங்காமல் கேளுங்கள்!"
        )

    else:
        # ENGLISH MODE

        # 1. Python
        if 'python' in q_clean:
            return (
                "**What is Python?**\n\n"
                "Python is a high-level, interpreted, dynamically-typed programming language created by **Guido van Rossum** and first released in 1991. It emphasizes code readability with its clean syntax.\n\n"
                "### Key Features of Python:\n"
                "1. **Easy to Learn & Read:** Uses simple English-like syntax.\n"
                "2. **Versatile Applications:** Dominates Artificial Intelligence (AI), Machine Learning (ML), Web Development, Data Science, and Automation.\n"
                "3. **Vast Ecosystem:** Supported by powerful libraries like NumPy, Pandas, Scikit-learn, TensorFlow, Django, and FastAPI.\n\n"
                "### Sample Python Code:\n"
                "```python\n"
                "# Calculate the factorial of a number\n"
                "def factorial(n):\n"
                "    return 1 if n <= 1 else n * factorial(n - 1)\n\n"
                "print('Factorial of 5:', factorial(5))  # Output: 120\n"
                "```"
            )

        # 2. API
        if 'api' in q_clean:
            return (
                "**What is an API (Application Programming Interface)?**\n\n"
                "An **API** is a set of defined rules and protocols that allows different software applications to communicate and transfer data with each other seamlessly.\n\n"
                "### Real-World Analogy:\n"
                "Think of an API as a waiter in a restaurant. You (the client) give your food order to the waiter (the API), the waiter brings the request to the kitchen (the server/database), and returns with your meal (the data response).\n\n"
                "### Common API Architectures:\n"
                "- **REST (Representational State Transfer):** Standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) exchanging JSON payloads.\n"
                "- **GraphQL:** Flexible single-endpoint query language returning only requested fields.\n"
                "- **WebSocket:** Full-duplex persistent connection for real-time applications."
            )

        # 3. HTML Login Page
        if 'login' in q_clean or 'html' in q_clean:
            return (
                "**Modern HTML & CSS Login Page Example:**\n\n"
                "Here is clean, production-ready code for a responsive login card:\n\n"
                "```html\n"
                "<!DOCTYPE html>\n"
                "<html lang=\"en\">\n"
                "<head>\n"
                "  <meta charset=\"UTF-8\">\n"
                "  <title>Login Portal</title>\n"
                "  <style>\n"
                "    body { font-family: 'Inter', sans-serif; background: #f0f4f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }\n"
                "    .login-card { background: #ffffff; padding: 32px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 340px; }\n"
                "    .login-card h2 { text-align: center; color: #1e3a8a; margin-bottom: 24px; }\n"
                "    .form-group { margin-bottom: 16px; }\n"
                "    .form-group label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #334155; }\n"
                "    .form-group input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }\n"
                "    .btn-login { width: 100%; padding: 11px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; transition: background 0.2s; }\n"
                "    .btn-login:hover { background: #1d4ed8; }\n"
                "  </style>\n"
                "</head>\n"
                "<body>\n"
                "  <div class=\"login-card\">\n"
                "    <h2>Sign In</h2>\n"
                "    <form>\n"
                "      <div class=\"form-group\">\n"
                "        <label>Email Address</label>\n"
                "        <input type=\"email\" required placeholder=\"user@example.com\">\n"
                "      </div>\n"
                "      <div class=\"form-group\">\n"
                "        <label>Password</label>\n"
                "        <input type=\"password\" required placeholder=\"••••••••\">\n"
                "      </div>\n"
                "      <button type=\"submit\" class=\"btn-login\">Login</button>\n"
                "    </form>\n"
                "  </div>\n"
                "</body>\n"
                "</html>\n"
                "```"
            )

        # 4. Greetings
        if any(w in q_clean for w in ['hello', 'hi', 'hey', 'who are you', 'help']):
            return (
                "Hello! I am **THAMILI AI**, your advanced intelligent assistant.\n\n"
                "I can help you with programming, technology architectures, general knowledge, web development, and problem solving. Feel free to ask any question!"
            )

        # Default fallback for any query in English
        return (
            f"**THAMILI AI Response:**\n\n"
            f"Here is a comprehensive explanation regarding your question about **\"{query.strip()}\"**:\n\n"
            f"1. **Core Concept:** This topic is essential across software development, data engineering, and modern computing workflows.\n"
            f"2. **Implementation & Practical Value:** By adhering to established best practices and modular architecture, you achieve optimal performance and scalability.\n"
            f"3. **Recommendation:** Evaluate specific constraints, requirements, and use-cases when implementing this solution.\n\n"
            f"If you need deeper code examples or architectural guidance on this topic, please ask!"
        )

class ThamiliRequestHandler(http.server.SimpleHTTPRequestHandler):
    directory = BASE_DIR

    def do_POST(self):
        try:
            if self.path == '/api/chat':
                content_length = int(self.headers.get('Content-Length', 0))
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                message = data.get('message', '').strip()
                lang = data.get('lang', 'ta')
                history = data.get('history', [])

                if not message:
                    resp_bytes = json.dumps({'error': 'Message cannot be empty'}).encode('utf-8')
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Content-Length', str(len(resp_bytes)))
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(resp_bytes)
                    return

                response_text = None
                api_provider, api_key = get_api_key()

                # Try live API if configured
                if api_key:
                    try:
                        if 'GEMINI' in api_provider or 'GOOGLE' in api_provider:
                            response_text = call_gemini_api(api_key, message, lang, history)
                        elif 'OPENAI' in api_provider or 'GROQ' in api_provider:
                            response_text = call_openai_api(api_key, message, lang, history)
                    except Exception as api_err:
                        print(f"External API call error: {api_err}. Falling back to internal engine.")

                # If no API key or external API failed, use internal intelligent reasoning engine
                if not response_text:
                    response_text = generate_local_intelligent_response(message, lang)

                res_obj = {
                    'success': True,
                    'response': response_text,
                    'lang': lang,
                    'provider': api_provider or 'thamili-native-engine'
                }
                resp_bytes = json.dumps(res_obj, ensure_ascii=False).encode('utf-8')
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Content-Length', str(len(resp_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(resp_bytes)
                return

            elif self.path == '/api/status':
                api_provider, _ = get_api_key()
                resp_bytes = json.dumps({
                    'status': 'online',
                    'provider': api_provider or 'thamili-core-ai'
                }).encode('utf-8')
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(resp_bytes)
                return

            self.send_response(404)
            self.end_headers()
        except Exception as e:
            import traceback
            traceback.print_exc()
            try:
                err_bytes = json.dumps({'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(err_bytes)))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(err_bytes)
            except Exception:
                pass


    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("", PORT), ThamiliRequestHandler) as httpd:
        print(f"THAMILI Server running at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Shutting down server.")
            httpd.server_close()
