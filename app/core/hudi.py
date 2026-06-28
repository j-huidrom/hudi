from app.services.openai_service import chat


class HUDI:

    def __init__(self):
        self.version = "0.2.0"

    def process(self, message: str):

        try:
            answer = chat(message)

            return {
                "platform": "HUDI",
                "response": answer,
                "version": self.version,
                "status": "success"
            }

        except Exception as ex:

            print(f"HUDI Error: {ex}")

            return {
                "platform": "HUDI",
                "response": (
                    "I'm sorry, I'm having trouble connecting to my AI brain "
                    "right now. Please try again in a moment."
                ),
                "version": self.version,
                "status": "error"
            }