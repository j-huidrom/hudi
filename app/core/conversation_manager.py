from app.core.intent_classifier import classify
from app.core.session_manager import Session

WELCOME = "WELCOME"
ASK_NAME = "ASK_NAME"
LEARNING = "LEARNING"
QUIZ = "QUIZ"
CAREER = "CAREER"
GOODBYE = "GOODBYE"
SILENCE = "SILENCE"
PROJECT = "PROJECT"
PLACEMENT = "PLACEMENT"
MOTIVATION = "MOTIVATION"
GENERAL = "GENERAL"

GOODBYE_WORDS = (
    "bye",
    "goodbye",
    "stop",
    "end",
    "thanks",
)

GOODBYE_PHRASES = (
    "thank you",
    "that's all",
    "that is all",
    "no thanks",
)

CONTINUATION_PHRASES = (
    "explain more",
    "tell me more",
    "more",
    "go deeper",
    "continue",
    "can you explain more",
)

QUIZ_WORDS = (
    "quiz",
    "test me",
    "ask me",
    "practice question",
)

TOPIC_KEYWORDS = {
    "AI Career": ("ai engineer", "ai career", "become an ai", "artificial intelligence career"),
    "Machine Learning": ("machine learning", "ml", "model training"),
    "Artificial Intelligence": ("artificial intelligence", "ai ", " ai", "generative ai", "llm", "gpt"),
    "Python": ("python",),
    "Electronics": ("ece", "electronics", "digital", "analog", "flip flop", "flip-flop"),
    "Projects": ("project", "mini project", "major project", "final year project"),
    "Career": ("career", "placement", "job", "internship", "roadmap", "resume"),
}

BRANCH_KEYWORDS = {
    "ECE": ("ece", "electronics", "electronics and communication"),
    "CSE": ("cse", "computer science"),
    "IT": (" it ", "information technology"),
    "EEE": ("eee", "electrical"),
    "Mechanical": ("mechanical",),
    "Civil": ("civil",),
    "AIML": ("aiml", "ai ml", "artificial intelligence and machine learning"),
    "Data Science": ("data science",),
}

YEAR_WORDS = {
    "first": "first year",
    "1st": "first year",
    "second": "second year",
    "2nd": "second year",
    "third": "third year",
    "3rd": "third year",
    "fourth": "fourth year",
    "4th": "fourth year",
    "final": "final year",
}

CAREER_GOAL_KEYWORDS = {
    "Placement": ("placement", "placements", "campus placement"),
    "Higher Studies": ("higher studies", "masters", "mtech", "ms ", "gate"),
    "Startup": ("startup", "start-up", "business"),
    "AI Engineer": ("ai engineer", "artificial intelligence engineer"),
    "Software Engineer": ("software engineer", "developer", "software developer", "sde"),
    "Research": ("research", "phd", "scientist"),
}

PROJECT_WORDS = ("project", "mini project", "major project", "final year project")
PLACEMENT_WORDS = ("placement", "placements", "interview", "resume", "aptitude")
MOTIVATION_WORDS = ("motivate", "motivation", "stressed", "confused", "afraid", "worried")


class ConversationManager:
    """Owns HUDI's session state and conversation routing."""

    def process(self, session: Session, message: str) -> dict[str, str]:
        """Update session state and return the next conversation mode."""

        text = message.lower().strip()
        intent = classify(message)
        session.question_count += 1

        if self._is_silence(text):
            return self._handle_silence(session, intent)

        session.silence_reprompted = False

        if self._is_goodbye(text):
            return self._transition(session, GOODBYE, "GOODBYE", intent)

        if session.state == WELCOME and not session.profile.name:
            session.profile.greeted = True
            session.profile.asked_name = True
            return self._transition(session, ASK_NAME, "ASK_NAME", intent)

        if session.state == ASK_NAME and not session.profile.name:
            return self._handle_name(session, message, text, intent)

        if session.pending_quiz_answer:
            return self._handle_quiz_answer(session, text)

        self._capture_profile_details(session, text)
        intent = self._resolve_intent(session, text, intent)
        self._update_topic(session, text, intent)

        next_state = self._state_for_intent(intent, text)
        return self._transition(session, next_state, self._mode_for_state(next_state), intent)

    def _handle_name(
        self,
        session: Session,
        message: str,
        text: str,
        intent: str,
    ) -> dict[str, str]:
        name = self._extract_name(message)

        if not name:
            return self._transition(session, ASK_NAME, "ASK_NAME", intent)

        session.profile.name = name
        self._capture_profile_details(session, text)
        return self._transition(session, LEARNING, "WELCOME_STUDENT", intent)

    def _handle_quiz_answer(self, session: Session, text: str) -> dict[str, str]:
        expected_answer = session.pending_quiz_answer or ""
        is_correct = expected_answer.lower() in text

        session.last_quiz_result = "correct" if is_correct else "incorrect"
        session.last_quiz_answer = expected_answer
        session.pending_quiz_question = None
        session.pending_quiz_answer = None

        return self._transition(session, LEARNING, "QUIZ", "quiz")

    def _handle_silence(self, session: Session, intent: str) -> dict[str, str]:
        mode = "SILENCE_REPEAT" if session.silence_reprompted else "SILENCE"
        session.silence_reprompted = True
        return self._transition(session, session.state, mode, intent)

    def _transition(
        self,
        session: Session,
        next_state: str,
        mode: str,
        intent: str,
    ) -> dict[str, str]:
        session.state = next_state
        session.current_mode = mode
        return {
            "mode": mode,
            "next_state": next_state,
            "intent": intent,
        }

    def _resolve_intent(self, session: Session, text: str, intent: str) -> str:
        if self._is_continuation(text) and session.current_topic:
            return "career" if "career" in session.current_topic.lower() else intent

        if session.profile.year and session.current_topic == "AI Career":
            return "career"

        return intent

    def _update_topic(self, session: Session, text: str, intent: str) -> None:
        """
        Update the active conversation topic.

        If the detected topic changes, remember the previous topic so HUDI
        knows the student intentionally switched context.
        """

        session.topic_changed = False

        # Continuation phrases should stay on the current topic.
        if self._is_continuation(text) and session.current_topic:
            return

        new_topic = self._topic_from_text(text)

        if not new_topic:
            if intent == "career":
                new_topic = "Career"
            elif intent == "ai":
                new_topic = "Artificial Intelligence"
            elif intent == "engineering":
                new_topic = "Engineering"

        if not new_topic:
            return

        if session.current_topic != new_topic:
            session.previous_topic = session.current_topic
            session.current_topic = new_topic
            session.topic_changed = True

    def _capture_profile_details(self, session: Session, text: str) -> None:
        if not session.profile.branch:
            session.profile.branch = self._branch_from_text(text)

        if not session.profile.year:
            session.profile.year = self._year_from_text(text)

        if not session.profile.career_goal:
            session.profile.career_goal = self._career_goal_from_text(text)

    def _state_for_intent(self, intent: str, text: str) -> str:
        if any(word in text for word in PROJECT_WORDS):
            return PROJECT

        if any(word in text for word in PLACEMENT_WORDS):
            return PLACEMENT

        if any(word in text for word in MOTIVATION_WORDS):
            return MOTIVATION

        if intent == "career" or "career" in text:
            return CAREER

        if any(word in text for word in QUIZ_WORDS):
            return QUIZ

        return LEARNING

    def _mode_for_state(self, state: str) -> str:
        modes = {
            CAREER: "CAREER",
            PROJECT: "PROJECT",
            PLACEMENT: "PLACEMENT",
            QUIZ: "QUIZ",
            MOTIVATION: "MOTIVATION",
            LEARNING: "TEACH",
        }
        return modes.get(state, "GENERAL")

    def _topic_from_text(self, text: str) -> str | None:
        for topic, keywords in TOPIC_KEYWORDS.items():
            if any(keyword in text for keyword in keywords):
                return topic

        return None

    def _branch_from_text(self, text: str) -> str | None:
        padded_text = f" {text} "

        for branch, keywords in BRANCH_KEYWORDS.items():
            if any(keyword in padded_text for keyword in keywords):
                return branch

        return None

    def _year_from_text(self, text: str) -> str | None:
        for keyword, year in YEAR_WORDS.items():
            if keyword in text:
                return year

        return None

    def _career_goal_from_text(self, text: str) -> str | None:
        for goal, keywords in CAREER_GOAL_KEYWORDS.items():
            if any(keyword in text for keyword in keywords):
                return goal

        return None

    def _is_goodbye(self, text: str) -> bool:
        return text in GOODBYE_WORDS or any(phrase in text for phrase in GOODBYE_PHRASES)

    def _is_continuation(self, text: str) -> bool:
        return any(phrase in text for phrase in CONTINUATION_PHRASES)

    def _is_silence(self, text: str) -> bool:
        return text in {"__silence__", "amazon.fallbackintent", "fallbackintent", ""}

    def _extract_name(self, message: str) -> str | None:
        text = message.strip()
        lowered = text.lower()

        name_prefixes = (
            "my name is ",
            "i am ",
            "i'm ",
            "this is ",
        )

        for prefix in name_prefixes:
            if lowered.startswith(prefix):
                return text[len(prefix):].strip().title()

        if len(text.split()) == 1 and text.isalpha():
            return text.title()

        return None
