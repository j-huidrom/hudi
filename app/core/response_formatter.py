import re


def format_response(text: str) -> str:
    """
    Formats GPT responses so they sound natural when spoken by Alexa.
    """

    if not text:
        return "I'm sorry, I don't have an answer for that."

    # Remove markdown
    text = text.replace("**", "")
    text = text.replace("*", "")
    text = text.replace("#", "")

    # Convert multiple newlines to a pause
    text = re.sub(r"\n\s*\n", ". ", text)

    # Convert remaining newlines to spaces
    text = text.replace("\n", " ")

    # Collapse multiple spaces
    text = re.sub(r"\s+", " ", text)

    return text.strip()