from openai import OpenAI
from app.core.logger import log_request
from app.core.prompt_builder import build_prompt

import os
import time

from app.core.response_formatter import format_response


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def chat(message: str):

    start = time.perf_counter()

    model = os.getenv("OPENAI_MODEL", "gpt-5.5")

    from app.core.intent_classifier import classify

    intent = classify(message)

    prompt = build_prompt(message, intent)

    response = client.responses.create(
        model=model,
        input=[
            {
                "role": "system",
                "content": prompt
            }
        ],
        max_output_tokens=80
    )

    elapsed = time.perf_counter() - start

    log_request(
        model,
        intent,
        message,
        elapsed
    )

    answer = response.output_text

    answer = format_response(answer)

    return answer

