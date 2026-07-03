import json

from fastapi import FastAPI, Request
from dotenv import load_dotenv
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from app.core.face_manager import face_manager
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import threading
import time

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://face.huidrom.com",
        "https://api.huidrom.com",
        "http://localhost:3000",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        raise

    request_data = payload.get("request", {})

    intent_name = None
    if request_data.get("type") == "IntentRequest":
        intent_name = request_data.get("intent", {}).get("name")

    if intent_name in (
        "GoodbyeIntent",
        "AMAZON.StopIntent",
        "AMAZON.CancelIntent",
    ):
        return {
            "version": "1.0",
            "response": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Goodbye. Have a great day."
                },
                "shouldEndSession": True
            }
        }

    message = get_alexa_message(payload)

    face_manager.update(
        state="listening",
        message="Listening..."
    )

    time.sleep(0.5)

    session_id = get_session_id(payload)
    session = session_manager.get(session_id)

    face_manager.update(
        state="thinking",
        message="Thinking..."
    )

    time.sleep(0.5)

    result = hudi.process(message, session)

    face_manager.update(
    state="speaking",
    message=result["response"]
    )

    reset_face()

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
        return "__alexa_fallback__"

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

def reset_face():

    def worker():

        time.sleep(4)

        face_manager.update(
            state="ready",
            message="Waiting for the next student..."
        )

    threading.Thread(
        target=worker,
        daemon=True
    ).start()

@app.get("/health")
async def health():
    return {
        "status": "UP",
        "platform": "HUDI",
        "version": "0.2.0"
    }

@app.get("/")
def root():
    return RedirectResponse("/face")

app.mount("/face", StaticFiles(directory="app/static/face", html=True), name="face")

from pydantic import BaseModel

class FaceStateRequest(BaseModel):
    state: str
    subtitle: str = ""
    message: str = ""


@app.post("/api/face/state")
async def update_face_state(request: FaceStateRequest):

    face_manager.update(
        state=request.state,
        message=request.message,
    )

    return {
        "success": True
    }


@app.get("/api/face/state")
async def get_face_state():

    return face_manager.get()
