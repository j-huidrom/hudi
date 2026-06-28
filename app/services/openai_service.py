from openai import OpenAI
import os
import time

start = time.perf_counter()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def chat(message: str):

    start = time.perf_counter()

    MODEL = os.getenv("OPENAI_MODEL", "gpt-5.5")

    response = client.responses.create(
    model=MODEL,
    input=[
        {
            "role": "system",
            "content": "You are HUDI, a friendly AI engineering colleague. Keep voice responses concise unless the user asks for more detail."
        },
        {
            "role": "user",
            "content": message
        }
    ],
    max_output_tokens=120
    )

    elapsed = time.perf_counter() - start

    print("=" * 60)
    print("HUDI OpenAI Call")
    print(f"Latency : {elapsed:.3f}s")
    print(f"Model   : {MODEL}")
    print("=" * 60)

    return response.output_text