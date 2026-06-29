from dataclasses import dataclass
from datetime import datetime


@dataclass
class Session:

    session_id: str

    student_name: str | None = None

    question_count: int = 0

    current_topic: str | None = None

    started_at: datetime = datetime.now()


class SessionManager:

    def __init__(self):

        self.sessions = {}

    def get(self, session_id: str):

        if session_id not in self.sessions:
            self.sessions[session_id] = Session(session_id)

        return self.sessions[session_id]

    def end(self, session_id: str):

        self.sessions.pop(session_id, None)