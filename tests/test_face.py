import requests

API = "https://api.huidrom.com/api/face/state"


def update(state, message):
    r = requests.post(
        API,
        json={
            "state": state,
            "message": message,
        },
        timeout=10,
    )

    print(r.status_code, r.json())


while True:

    print("\nHUDI Face Tester")
    print("----------------")
    print("1. Ready")
    print("2. Listening")
    print("3. Thinking")
    print("4. Speaking")
    print("5. Exit")

    choice = input("\nChoice: ")

    if choice == "1":
        update(
            "ready",
            "Yellow Buddy! I'm ready for your next engineering question."
        )

    elif choice == "2":
        update(
            "listening",
            "I'm listening..."
        )

    elif choice == "3":
        update(
            "thinking",
            "Analyzing your question..."
        )

    elif choice == "4":
        msg = input("Enter response: ")

        update(
            "speaking",
            msg
        )

    elif choice == "5":
        break