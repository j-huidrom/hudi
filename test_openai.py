from dotenv import load_dotenv

load_dotenv()

from app.core.hudi import HUDI

hudi = HUDI()

response = hudi.process("Who are you?")
print(response)

response = hudi.process("Explain flip flops?")
print(response)

response = hudi.process("How do I become an AI Engineer?")
print(response)