from dotenv import load_dotenv

load_dotenv()

from app.core.hudi import HUDI

hudi = HUDI()

response = hudi.process("Who are you?")

print(response)