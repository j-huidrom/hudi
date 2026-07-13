#!/usr/bin/env python3

"""
HUDI Face Console

Interactive tester for the HUDI Face SSE pipeline.

Usage:

python tools/test_face_console.py

or

python tools/test_face_console.py --host http://localhost:8000

Press Ctrl+C anytime to exit.
"""

import argparse
import requests
import sys

DEFAULT_HOST = "https://face.huidrom.com"


MENU = """
====================================================
                 HUDI FACE CONSOLE
====================================================

1  Ready
2  Listening
3  Thinking
4  Speaking
5  Goodbye

6  Demo Sequence

m  Custom Message
s  Custom State

h  Help
q  Quit

====================================================
"""


def post_state(host, state, message):

    url = f"{host}/api/face/state"

    payload = {
        "state": state,
        "message": message
    }

    try:

        response = requests.post(
            url,
            json=payload,
            timeout=5
        )

        print(f"\n✅ {state.upper()}")

        if response.status_code != 200:
            print(response.text)

    except Exception as ex:
        print(f"\n❌ {ex}")


def demo(host):

    sequence = [
        ("ready", "HUDI is ready."),
        ("listening", "Listening..."),
        ("thinking", "Thinking..."),
        ("speaking", "Speaking..."),
        ("ready", "Done.")
    ]

    import time

    for state, message in sequence:

        post_state(host, state, message)

        time.sleep(3)


def custom_state(host):

    state = input("\nState : ").strip()

    message = input("Message : ").strip()

    post_state(host, state, message)


def custom_message(host):

    message = input("\nMessage : ").strip()

    post_state(host, "thinking", message)


def main():

    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--host",
        default=DEFAULT_HOST
    )

    args = parser.parse_args()

    print(MENU)

    while True:

        try:

            choice = input("HUDI> ").strip().lower()

            if choice == "1":
                post_state(args.host, "ready", "HUDI is ready.")

            elif choice == "2":
                post_state(args.host, "listening", "Listening...")

            elif choice == "3":
                post_state(args.host, "thinking", "Thinking...")

            elif choice == "4":
                post_state(args.host, "speaking", "Speaking...")

            elif choice == "5":
                post_state(args.host, "goodbye", "Goodbye!")

            elif choice == "6":
                demo(args.host)

            elif choice == "m":
                custom_message(args.host)

            elif choice == "s":
                custom_state(args.host)

            elif choice == "h":
                print(MENU)

            elif choice == "q":
                print("\nBye.")
                sys.exit(0)

            else:
                print("Unknown command. Press h for help.")

        except KeyboardInterrupt:
            print("\n\nExiting...")
            sys.exit(0)


if __name__ == "__main__":
    main()