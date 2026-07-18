from threading import Lock
from queue import Queue

class FaceManager:

    def __init__(self):
        self._lock = Lock()

        self.state = "idle"
        self.message = (
            "Yellow Buddy! I'm ready for your next engineering question."
        )
        self.listeners = []

    def update(self, state=None, message=None):

        
        with self._lock:

            if state is not None:
                self.state = state

            if message is not None:
                self.message = message

            event = {
                "state": self.state,
                "message": self.message,
            }

            print(
                f"[FACE] state={self.state}, listeners={len(self.listeners)}"
            )

            dead = []

            for q in self.listeners:

                try:

                    q.put_nowait(event)

                except Exception:

                    dead.append(q)

            for q in dead:

                if q in self.listeners:
                    self.listeners.remove(q)

    def get(self):

        with self._lock:

            return {
                "state": self.state,
                "message": self.message,
            }
        
    def subscribe(self):

        q = Queue()

        self.listeners.append(q)

        return q


    def unsubscribe(self, q):

        if q in self.listeners:

            self.listeners.remove(q)        


face_manager = FaceManager()