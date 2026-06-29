import time


def log_request(model, intent, question, latency):

    print("=" * 60)
    print("HUDI REQUEST")
    print(f"Model    : {model}")
    print(f"Intent   : {intent}")
    print(f"Latency  : {latency:.3f}s")
    print(f"Question : {question}")
    print("=" * 60)