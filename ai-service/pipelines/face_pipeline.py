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


def train_classifier(X, y):

    if len(X) == 0 or len(y) == 0:
        return None

    if len(set(y)) < 2:
        return None

    clf = SVC(
        kernel="linear",
        probability=True,
        class_weight="balanced",
    )

    clf.fit(X, y)

    return clf
    


def predict_faces(class_image_np, clf):

    if clf is None:
        return []

    encodings = get_face_embeddings(class_image_np)

    if not encodings:
        return []

    detected_students = []

    for encoding in encodings:

        predicted_id = clf.predict([encoding])[0]

        detected_students.append(int(predicted_id))

    return detected_students