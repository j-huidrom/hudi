from threading import Lock


class FaceManager:

    def __init__(self):
        self._lock = Lock()

        self.state = "ready"
        self.message = (
            "Yellow Buddy! I'm ready for your next engineering question."
        )

    def update(self, state=None, message=None):

        with self._lock:

            if state is not None:
                self.state = state

            if message is not None:
                self.message = message

    def get(self):

        with self._lock:

            return {
                "state": self.state,
                "message": self.message,
            }


face_manager = FaceManager()