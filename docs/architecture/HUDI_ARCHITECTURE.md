# HUDI Architecture

## High Level Architecture

HUDI is an AI Engineering Professor for voice-first learning conversations.
Alexa remains the external voice interface, while the application core is organized around explicit conversation, teaching context and prompt construction responsibilities.

```text
Alexa
  |
  v
FastAPI / Voice Adapter
  |
  v
Conversation Manager
  |
  v
Professor
  |
  v
Prompt Builder
  |
  v
OpenAI Service
  |
  v
FastAPI / Voice Adapter
  |
  v
Alexa
```

## Sequence Diagram

```text
Alexa -> FastAPI: User speech request
FastAPI -> SessionManager: Load session
FastAPI -> HUDI: process(message, session)
HUDI -> ConversationManager: process(session, message)
ConversationManager -> HUDI: mode, next_state, intent
HUDI -> Professor: build_context(session)
Professor -> HUDI: known student context
HUDI -> OpenAI Service: chat(message, context, mode, intent)
OpenAI Service -> Prompt Builder: build_prompt(message, mode, context, intent)
Prompt Builder -> OpenAI Service: prompt
OpenAI Service -> OpenAI: response request
OpenAI -> OpenAI Service: answer
OpenAI Service -> HUDI: formatted answer
HUDI -> Session: add_exchange(message, answer)
HUDI -> FastAPI: response envelope
FastAPI -> Alexa: PlainText response
```

## Component Responsibilities

### Voice Adapter

`app/api/main.py` receives Alexa requests, extracts the spoken message, resolves the Alexa session ID and returns the Alexa-compatible response format.

### Session Manager

`app/core/session_manager.py` owns session lookup and lifecycle. A `Session` stores the student profile, current state, question count, current topic, start time and the last 10 conversation exchanges.

### Student Profile

`app/core/student_profile.py` stores known student attributes such as name, branch, year, interests, learning goal and greeting flags.

### Conversation Manager

`app/core/conversation_manager.py` owns conversation state transitions. It decides the conversation mode, next state and intent without calling OpenAI.

### Professor

`app/core/professor.py` builds the teaching context from the session and recent memory. It never calls OpenAI.

### Prompt Builder

`app/core/prompt_builder.py` converts the student message, mode, context and intent into a structured teaching prompt.

### OpenAI Service

`app/services/openai_service.py` is the only component that calls OpenAI. It keeps backward compatibility with `chat(message)` while supporting `chat(message, context, mode, intent)`.

### HUDI Orchestrator

`app/core/hudi.py` coordinates the flow between conversation state, professor context, prompt-backed OpenAI calls and session memory. It should contain minimal business logic.

## Folder Structure

```text
app/
  api/
    main.py
  core/
    conversation_manager.py
    hudi.py
    intent_classifier.py
    professor.py
    prompt_builder.py
    response_formatter.py
    session_manager.py
    student_profile.py
  services/
    openai_service.py
docs/
  architecture/
    HUDI_ARCHITECTURE.md
```

## Future Roadmap

- Add focused unit tests for conversation state transitions.
- Add prompt snapshot tests for the main modes.
- Introduce a dedicated voice adapter class when more platforms are added beyond Alexa.
- Persist sessions outside process memory when HUDI needs multi-instance deployment.
- Expand profile extraction only after there is a clear product need and test coverage.
