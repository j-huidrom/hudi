from app.services.openai_service import chat


class HUDI:

    def __init__(self):
        self.version = "0.3.0"

    def process(self, message: str):

        text = message.lower()

        if "who built you" in text or "created you" in text:
            return {
                "platform": "HUDI",
                "response": (
                    "I was created by Jashyawanta Huidrom as an AI Engineering Teaching Assistant "
                    "to inspire engineering students."
                ),
                "version": self.version,
                "status": "success"
            }

        if "how do you work" in text:
            return {
                "platform": "HUDI",
                "response": (
                    "Your voice reaches Alexa, which securely sends your question to my Ubuntu server. "
                    "HUDI understands your question, works with an AI model to generate an answer, "
                    "and sends the response back through Alexa."
                ),
                "version": self.version,
                "status": "success"
            }

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