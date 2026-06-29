from app.services.openai_service import chat


class HUDI:

    def __init__(self):
        self.version = "0.3.0"

    def process(self, message: str, session):

        text = message.lower()

        # Count questions in this session
        session.question_count += 1

        # First interaction of every student
        if session.question_count == 1:

            return {
                "platform": "HUDI",
                "response": (
                    "Hello! Welcome to HUDI. "
                    "I'm your AI Engineering Teaching Assistant. "
                    "Before we begin, may I know your name?"
                ),
                "version": self.version,
                "status": "success"
            }

        # Store student's name
        if session.student_name is None:

            session.student_name = message.strip().title()

            return {
                "platform": "HUDI",
                "response": (
                    f"Nice to meet you, {session.student_name}. "
                    "What would you like to learn today?"
                ),
                "version": self.version,
                "status": "success"
            }

        # Built-in responses

        if "who built you" in text or "created you" in text:

            return {
                "platform": "HUDI",
                "response": (
                    "I was created by Jashyawanta Huidrom as an AI Engineering "
                    "Teaching Assistant to inspire engineering students."
                ),
                "version": self.version,
                "status": "success"
            }

        if "how do you work" in text:

            return {
                "platform": "HUDI",
                "response": (
                    "Your voice reaches Alexa, which securely sends your question "
                    "to my Ubuntu server. HUDI understands your request, works "
                    "with an AI model to prepare a response, and then sends the "
                    "answer back through Alexa."
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