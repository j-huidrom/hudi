from dataclasses import dataclass, field
from datetime import datetime

from app.core.student_profile import StudentProfile

MAX_HISTORY_EXCHANGES = 10
SUMMARY_MESSAGE_COUNT = 5


@dataclass
class Session:
    """In-memory state for one student's HUDI conversation."""

    session_id: str
    profile: StudentProfile = field(default_factory=StudentProfile)
    history: list[dict[str, str]] = field(default_factory=list)
    state: str = "WELCOME"
    question_count: int = 0
    current_topic: str | None = None
    current_mode: str = "WELCOME"
    silence_reprompted: bool = False
    teaching_answer_count: int = 0
    pending_quiz_question: str | None = None
    pending_quiz_answer: str | None = None
    last_quiz_result: str | None = None
    last_quiz_answer: str | None = None
    last_professor_phrase: str | None = None
    started_at: datetime = field(default_factory=datetime.now)

    def add_exchange(self, user_message: str, assistant_response: str) -> None:
        """Store one user/HUDI exchange and keep recent memory bounded."""

        self.history.append(
            {
                "user": user_message,
                "assistant": assistant_response,
            }
        )
        self.history = self.history[-MAX_HISTORY_EXCHANGES:]

    def last_messages(self, limit: int = SUMMARY_MESSAGE_COUNT) -> list[dict[str, str]]:
        """Return the most recent exchanges used for prompt context."""

        return self.history[-limit:]


class SessionManager:
    """Creates and retrieves in-memory HUDI sessions."""

    def __init__(self):
        self.sessions: dict[str, Session] = {}

    def get(self, session_id: str) -> Session:
        """Return an existing session or create a new one."""

        if session_id not in self.sessions:
            self.sessions[session_id] = Session(session_id)

        return self.sessions[session_id]

    def end(self, session_id: str) -> None:
        """Remove a session from memory."""

        self.sessions.pop(session_id, None)
