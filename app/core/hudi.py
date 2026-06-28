class HUDI:

    def __init__(self):
        self.version = "0.1.0"

    def process(self, message: str):

        return {
            "platform": "HUDI",
            "response": f"Hello! I am HUDI. You said: {message}",
            "version": self.version
        }