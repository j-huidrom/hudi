from openai import OpenAI
import os
import time

start = time.perf_counter()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def chat(message: str):
    model_name = os.getenv("OPENAI_MODEL", "gpt-5.5")

    response = client.responses.create(
    model_name=model_name,
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
    print(f"Model   : {model_name}")
    print("=" * 60)

    return response.output_text