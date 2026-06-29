def classify(message: str) -> str:

    text = message.lower()

    # ABOUT HUDI
    about_keywords = [
        "who are you",
        "what are you",
        "your name",
        "about you",
        "introduce yourself"
    ]

    # CAREER
    career_keywords = [
        "career",
        "job",
        "placement",
        "placements",
        "internship",
        "resume",
        "salary",
        "roadmap",
        "become",
        "future"
    ]

    # ENGINEERING
    engineering_keywords = [
        "electronics",
        "ece",
        "digital",
        "analog",
        "flip flop",
        "flip-flop",
        "transistor",
        "microprocessor",
        "microcontroller",
        "network",
        "dbms",
        "operating system",
        "os",
        "python",
        "java",
        "c++"
    ]

    # AI
    ai_keywords = [
        "artificial intelligence",
        "machine learning",
        "deep learning",
        "neural network",
        "gpt",
        "llm",
        "rag",
        "agentic",
        "generative ai"
    ]

    if any(k in text for k in about_keywords):
        return "about"

    # Career BEFORE AI
    if any(k in text for k in career_keywords):
        return "career"

    # Engineering BEFORE AI
    if any(k in text for k in engineering_keywords):
        return "engineering"

    if any(k in text for k in ai_keywords):
        return "ai"

    return "general"