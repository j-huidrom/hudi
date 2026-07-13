#!/usr/bin/env python3

"""
HUDI Face State Tester

Usage:

python tools/test_face_states.py

or

python tools/test_face_states.py --host http://localhost:8000

or

python tools/test_face_states.py --host https://face.huidrom.com
"""

import argparse
import json
import time

import requests


DEFAULT_HOST = "https://face.huidrom.com"

STATES = [
    ("ready", "HUDI is ready."),
    ("listening", "Listening to user."),
    ("thinking", "Thinking..."),
    ("speaking", "Speaking response."),
    ("ready", "Conversation complete."),
]


def send_state(host, state, message):
    url = f"{host}/api/face/state"

    payload = {
        "state": state,
        "message": message
    }

    print(f"\n>> {state.upper()}")

    response = requests.post(
        url,
        json=payload,
        timeout=10
    )

    print("Status :", response.status_code)

    try:
        print(json.dumps(response.json(), indent=2))
    except Exception:
        print(response.text)


def main():

    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--host",
        default=DEFAULT_HOST,
        help="HUDI server URL"
    )

    parser.add_argument(
        "--delay",
        type=float,
        default=3,
        help="Seconds between state changes"
    )

    args = parser.parse_args()

    print("=" * 60)
    print("HUDI Face State Tester")
    print("=" * 60)

    for state, message in STATES:

        send_state(args.host, state, message)

        time.sleep(args.delay)

    print("\nDone.")


if __name__ == "__main__":
    main()