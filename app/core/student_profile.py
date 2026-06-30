from dataclasses import dataclass, field


@dataclass
class StudentProfile:
    """Known profile details for one engineering student."""

    name: str | None = None
    branch: str | None = None
    year: str | None = None
    interests: list[str] = field(default_factory=list)
    learning_goal: str | None = None
    career_goal: str | None = None
    greeted: bool = False
    asked_name: bool = False
