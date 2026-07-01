from app.core.session_manager import Session


class Professor:
    """Builds teaching context from the current HUDI session."""

    def build_context(self, session: Session) -> str:
        """Return the student and conversation summary for prompt generation."""

        profile = session.profile
        context: list[str] = []

        context.append(f"Question count: {session.question_count}.")
        context.append(f"Teaching answer count: {session.teaching_answer_count}.")
        context.append(f"Current conversation mode: {session.current_mode}.")

        if profile.name:
            context.append(f"The student's name is {profile.name}.")
        else:
            context.append("The student's name is not known yet.")

        if profile.branch:
            context.append(f"The student studies {profile.branch}.")

        if profile.year:
            context.append(f"The student is in {profile.year}.")

        if profile.interests:
            interests = ", ".join(profile.interests)
            context.append(f"The student's interests are {interests}.")

        if profile.learning_goal:
            context.append(f"The student's learning goal is {profile.learning_goal}.")

        if profile.career_goal:
            context.append(f"The student's career goal is {profile.career_goal}.")

        if session.current_topic:
            context.append(f"Current topic is {session.current_topic}.")

        if getattr(session, "previous_topic", None):
            context.append(f"Previous topic was {session.previous_topic}.")

        if getattr(session, "topic_changed", False):
            context.append(
                "The student has intentionally started a new topic. "
                "Do not continue the previous discussion unless they explicitly ask to return to it."
            )

        if session.last_professor_phrase:
            context.append(f"Do not reuse this opening phrase: {session.last_professor_phrase}.")

        if session.pending_quiz_question:
            context.append(f"Pending quiz question: {session.pending_quiz_question}.")

        if session.history:
            context.append(
                "The recent conversation below is background only. "
                "Always prioritize the student's latest question. "
                "If the topic_changed flag is true, ignore the previous topic unless the student explicitly refers back to it."
            )
            context.append("Recent conversation:")
            context.extend(self._format_history(session))

        return "\n".join(context)

    def _format_history(self, session: Session) -> list[str]:
        history: list[str] = []

        for exchange in session.last_messages():
            user_message = exchange.get("user")
            assistant_response = exchange.get("assistant")

            if user_message:
                history.append(f"Student: {user_message}")

            if assistant_response:
                history.append(f"HUDI: {assistant_response}")

        return history
