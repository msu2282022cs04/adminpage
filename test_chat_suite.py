import urllib.request
import json
import sys

# Set standard output encoding to utf-8
sys.stdout.reconfigure(encoding='utf-8')

def test_chat(msg, lang):
    req = urllib.request.Request(
        "http://localhost:8080/api/chat",
        data=json.dumps({"message": msg, "lang": lang}).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"}
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"=== TEST [lang={lang}] msg: '{msg}' ===")
        print("Success:", res.get("success"))
        print("Lang:", res.get("lang"))
        print("Response:\n", res.get("response"))
        print("-" * 50)

if __name__ == '__main__':
    test_chat("Python என்றால் என்ன?", "ta")
    test_chat("What is an API?", "ta")
    test_chat("Create a simple HTML login page", "ta")
    test_chat("What is an API?", "en")
    test_chat("Python என்றால் என்ன?", "en")
    test_chat("How does React work?", "ta")
    test_chat("Explain database and SQL", "ta")
