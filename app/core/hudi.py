from app.core.conversation_manager import ConversationManager
from app.core.professor import Professor
from app.core.session_manager import Session
from app.services.openai_service import chat


class HUDI:
    """Coordinates conversation flow, professor context and LLM responses."""

    def __init__(self) -> None:
        self.version = "0.3.1"
        self.conversation_manager = ConversationManager()
        self.professor = Professor()
        self._default_session = Session("default")

    def process(self, message: str, session: Session | None = None) -> dict[str, object]:
        """Process one student message and return the Alexa-compatible HUDI result."""

        active_session = session or self._default_session

        try:
            conversation = self.conversation_manager.process(active_session, message)
            local_response = self._local_response(active_session, conversation["mode"])

            if local_response:
                active_session.add_exchange(message, local_response)
                return self._success_response(
                    local_response,
                    end_session=conversation["next_state"] == "GOODBYE",
                )

            context = self.professor.build_context(active_session)
            answer = chat(
                message=message,
                context=context,
                mode=conversation["mode"],
                intent=conversation["intent"],
            )

            active_session.add_exchange(message, answer)

            return self._success_response(
                answer,
                end_session=conversation["next_state"] == "GOODBYE",
            )

        except Exception as ex:
            print(ex)
            return self._error_response()

    def _local_response(self, session: Session, mode: str) -> str | None:
        name = session.profile.name

        if mode == "ASK_NAME":
            return "Hello. Before we begin, what's your name?"

        if mode == "WELCOME_STUDENT":
            return f"Nice to meet you {name}. What would you like to learn?"

        if mode == "SILENCE":
            return "I'm still here if you'd like to ask another engineering question."

        if mode == "SILENCE_REPEAT":
            return "Take your time. You can ask me about engineering, programming, AI or careers."

        if mode == "GOODBYE":
            if name:
                return f"It was great talking with you {name}. Keep learning. Wokhheey."

            return "It was great talking with you. Keep learning. Wokhheey."

        return None

    def _success_response(
        self,
        response: str,
        end_session: bool = False,
    ) -> dict[str, object]:
        return {
            "platform": "HUDI",
            "response": response,
            "version": self.version,
            "status": "success",
            "end_session": end_session,
        }

    def _error_response(self) -> dict[str, object]:
        return {
            "platform": "HUDI",
            "response": (
                "I'm having trouble connecting to my AI brain right now. "
                "Please try again in a moment."
            ),
            "version": self.version,
            "status": "error",
            "end_session": False,
        }
