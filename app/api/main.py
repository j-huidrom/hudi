from fastapi import FastAPI, Request

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
        print("Alexa Request:", payload)
    except Exception:
        print("No JSON body received")

    return {
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Hello, I am HUDI. Our connection is working."
            },
            "shouldEndSession": False
        }
    }