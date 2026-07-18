from openai import OpenAI
from app.core.logger import log_request
import os
import time
from app.core.face_manager import face_manager

from app.core.intent_classifier import classify
from app.core.prompt_builder import build_prompt
from app.core.response_formatter import format_response


client: OpenAI | None = None


def chat(
    message: str,
    context: str = "",
    mode: str = "TEACH",
    intent: str = "general",
) -> str:
    start = time.perf_counter()

    model = os.getenv("OPENAI_MODEL", "gpt-5.5")

    if intent == "general":
        intent = classify(message)

    prompt = build_prompt(
        message=message,
        mode=mode,
        context=context,
        intent=intent,
    )

    face_manager.update(
        state="thinking",
        message="Thinking..."
    )

    response = _get_client().responses.create(
        model=model,
        input=[
            {
                "role": "system",
                "content": prompt
            }
        ],
        max_output_tokens=_max_output_tokens(message)
    )

    elapsed = time.perf_counter() - start

    log_request(
        model,
        intent,
        message,
        elapsed
    )

    answer = response.output_text

    face_manager.update(
        state="speaking",
        message=answer
    )

    answer = format_response(answer)

    return answer


def _get_client() -> OpenAI:
    global client

    if client is None:
        client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

    return client


def _max_output_tokens(message: str) -> int:
    detail_requests = (
        "explain in detail",
        "detail",
        "deep",
        "go deeper",
        "elaborate",
    )

    if any(phrase in message.lower() for phrase in detail_requests):
        return 220

    return 140

