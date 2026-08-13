import dlib
import numpy as np
import face_recognition_models

from sklearn.svm import SVC

def load_dlib_models():

    detector = dlib.get_frontal_face_detector()

    shape = dlib.shape_predictor(
        face_recognition_models.pose_predictor_model_location()
    )

    facerec = dlib.face_recognition_model_v1(
        face_recognition_models.face_recognition_model_location()
    )
    
    return detector, shape, facerec


def get_face_embeddings(image_np):

    detector, sp, facerec = load_dlib_models()

    faces = detector(image_np,1)

    encodings = []

    for face in faces:

        shape = sp(image_np, face)

        face_decriptor = facerec.compute_face_descriptor(
            image_np,
            shape,
            1
        )

        encodings.append(np.array(face_decriptor))

    return encodings

def build_training_data(students):

    X = []
    y = []

    for student in students:

        embedding = student.get("face_embedding")

        if embedding:

            X.append(np.array(embedding))
            y.append(student.get("student_id"))

    return X, y

    