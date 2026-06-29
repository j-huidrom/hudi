from app.services.openai_service import chat


class HUDI:

    def __init__(self):
        self.version = "0.3.1"

    def process(self, message: str, session):

        text = message.lower().strip()

        session.question_count += 1

        # First interaction
        if session.question_count == 1:

            return {
                "platform": "HUDI",
                "response": (
                    "Hello! I'm HUDI, your Engineering Buddy. "
                    "I can help you understand engineering, artificial intelligence, "
                    "programming, projects and career guidance. "
                    "Go ahead and ask me your first question."
                ),
                "version": self.version,
                "status": "success",
                "end_session": False
            }

        # Goodbye handling
        goodbye_words = [
            "thank you",
            "thanks",
            "bye",
            "goodbye",
            "that's all",
            "that is all",
            "no thanks"
        ]

        if any(word in text for word in goodbye_words):

            return {
                "platform": "HUDI",
                "response": (
                    "You're very welcome. "
                    "I enjoyed our conversation. "
                    "I hope I helped you learn something new today. "
                    "Have a wonderful day and keep building amazing things."
                ),
                "version": self.version,
                "status": "success",
                "end_session": True
            }

        # Built-in knowledge

        if "who created you" in text or "who built you" in text:

            return {
                "platform": "HUDI",
                "response": (
                    "I was created by Jashyawanta Huidrom "
                    "to demonstrate how modern AI systems are engineered "
                    "and to inspire engineering students."
                ),
                "version": self.version,
                "status": "success",
                "end_session": False
            }

        if "how do you work" in text:

            return {
                "platform": "HUDI",
                "response": (
                    "When you speak, Alexa securely sends your question to my server. "
                    "HUDI understands your request, collaborates with an AI model, "
                    "and sends the answer back through Alexa."
                ),
                "version": self.version,
                "status": "success",
                "end_session": False
            }

        try:

            answer = chat(message)

            return {
                "platform": "HUDI",
                "response": answer,
                "version": self.version,
                "status": "success",
                "end_session": False
            }

        except Exception as ex:

            print(ex)

            return {
                "platform": "HUDI",
                "response": (
                    "I'm having trouble connecting to my AI brain right now. "
                    "Please try again in a moment."
                ),
                "version": self.version,
                "status": "error",
                "end_session": False
            }