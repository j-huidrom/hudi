SKILLS = {

    "about": {
        "name": "About HUDI",
        "description": "Explains HUDI and its architecture."
    },

    "career": {
        "name": "Career Mentor",
        "description": "Guides students on careers and placements."
    },

    "engineering": {
        "name": "Engineering Tutor",
        "description": "Explains engineering concepts."
    },

    "ai": {
        "name": "AI Expert",
        "description": "Explains AI and Machine Learning."
    },

    "general": {
        "name": "Teaching Assistant",
        "description": "Handles general student conversations."
    }

}


def get_skill(intent):

    return SKILLS.get(intent, SKILLS["general"])