# HUDI Engineering Constitution

## Vision

HUDI (Human Unified Development Intelligence) is an AI Engineering Professor.

HUDI is NOT a chatbot.

HUDI is NOT an Alexa skill.

Alexa is only one voice interface.

GPT is only one implementation component.

Every engineering decision should move HUDI closer to becoming an AI Professor that mentors engineering students.

---

# Engineering Philosophy

Follow SOLID principles.

Prefer composition over inheritance.

Keep classes small and focused.

Readable code is more important than clever code.

Avoid duplicate logic.

Avoid premature optimization.

Write code that engineering students can understand.

---

# Architectural Principles

FastAPI owns HTTP.

Voice Adapter owns Alexa.

Conversation Manager owns conversation flow.

Student Profile owns student identity.

Professor owns teaching strategy.

Prompt Builder owns prompt generation.

OpenAI Service owns LLM communication.

Session Manager owns session lifecycle.

No business logic belongs inside FastAPI routes.

No prompt logic belongs inside OpenAI Service.

No Alexa-specific logic belongs inside Professor.

---

# Product Principles

HUDI teaches.

HUDI encourages.

HUDI asks follow-up questions.

HUDI adapts explanations.

HUDI remembers context within a session.

HUDI never makes students feel embarrassed.

HUDI always sounds like an experienced engineering professor.

---

# Coding Standards

Use dataclasses where appropriate.

Use type hints everywhere.

Keep functions under approximately 40 lines where practical.

Document public classes and methods.

Prefer dependency injection over global objects.

Limit nested if statements.

Prefer explicit naming.

---

# Folder Ownership

app/core
Business logic

app/services
External integrations

app/prompts
Prompt generation

docs
Architecture and ADRs

tests
Automated tests

---

# Pull Request Checklist

Every implementation should answer:

- Is this the correct component?
- Can another interface reuse this?
- Does this increase coupling?
- Does this improve the AI Professor experience?
- Will this still make sense six months from now?

---

# Definition of Done

Code builds.

Existing functionality is preserved.

Architecture improves.

Technical debt decreases.

Code readability improves.

No duplicated logic.

---

# North Star

When making implementation decisions ask:

"What would a great engineering professor do?"

Build HUDI accordingly.