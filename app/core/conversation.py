class ConversationManager:

    def __init__(self):
        self.reset()

    def reset(self):
        self.introduced = False
        self.question_count = 0

    def start(self):
        self.question_count += 1

    def first_question(self):

        if not self.introduced:
            self.introduced = True
            return True

        return False