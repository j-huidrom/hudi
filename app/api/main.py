import json

from fastapi import FastAPI, Request
from dotenv import load_dotenv

load_dotenv()

from app.core.hudi import HUDI

hudi = HUDI()

from app.core.session_manager import SessionManager

session_manager = SessionManager()

app = FastAPI(
    title="HUDI",
    description="Human Unified Development Intelligence",
    version="0.1.0",
)

from fastapi import Request

@app.post("/alexa")
async def alexa(request: Request):

    try:
        payload = await request.json()

        print("=" * 80)
        print(json.dumps(payload, indent=2))
        print("=" * 80)

    except Exception:
        print("No JSON body received")

    message = get_alexa_message(payload)

    session_id = get_session_id(payload)
    session = session_manager.get(session_id)

    result = hudi.process(message, session)

    print(f"Ending session: {result.get('end_session', False)}")

    should_end = result.get("end_session", False)

    response = {
        "outputSpeech": {
            "type": "PlainText",
            "text": result["response"]
        },
        "shouldEndSession": should_end
    }

    if not should_end:
        response["reprompt"] = {
            "outputSpeech": {
                "type": "PlainText",
                "text": "I'm listening."
            }
        }

    return {
        "version": "1.0",
        "response": response
    }

def get_alexa_message(payload):

    request = payload.get("request", {})

    request_type = request.get("type")

    intent_name = None

    if request_type == "IntentRequest":
        intent_name = request.get("intent", {}).get("name")

    print("Intent:", intent_name)

    if intent_name == "AMAZON.FallbackIntent":
        print("Fallback Intent received")
        return "__silence__"

    if request_type == "LaunchRequest":
        return (
            "Introduce yourself as HUDI. "
            "Say you are an AI Engineering Teaching Assistant. "
            "Invite the student to ask any engineering or AI question. "
            "Keep it under 25 words."
        )

    if request_type == "IntentRequest":

        intent = request.get("intent", {})
        slots = intent.get("slots", {})

        for slot in slots.values():
            if "value" in slot:
                return slot["value"]

        return intent.get("name", "Hello")

    return (
    "Introduce yourself briefly. "
    "Mention that you are HUDI. "
    "Ask how you can help. "
    "Keep the response under 25 words."
)

def get_session_id(payload):

    session = payload.get("session", {})

    return session.get("sessionId", "default")

@app.get("/health")
async def health():
    return {
        "status": "UP",
        "platform": "HUDI",
        "version": "0.2.0"
    }
