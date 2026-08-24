def get_students_with_embeddings():

    return []

def get_voice_candidates(students):

    candidates = {}

    for student in students:

        voice_embedding = student.get("voice_embedding")

        if voice_embedding:

            student_id = student.get("student_id")

            candidates[student_id] = voice_embedding

    return candidates