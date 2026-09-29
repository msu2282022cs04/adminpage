import urllib.request
import json
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

def test_query(msg, lang):
    print(f"\n--- Testing Query: '{msg}' | Lang: {lang} ---")
    data = json.dumps({'message': msg, 'lang': lang}).encode('utf-8')
    req = urllib.request.Request(
        'http://localhost:8080/api/chat',
        data=data,
        headers={'Content-Type': 'application/json; charset=utf-8'}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            print("Response:")
            print(res['response'])
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    test_query('Python என்றால் என்ன?', 'ta')
    test_query('What is an API?', 'ta')
    test_query('Create a simple HTML login page', 'ta')
    test_query('What is Python?', 'en')
