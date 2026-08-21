import dlib
import numpy as np
import face_recognition_models

from sklearn.svm import SVC

_dlib_models = None
_trained_classifier = None

def load_dlib_models():

    global _dlib_models

    if _dlib_models is not None:
        return _dlib_models

    detector = dlib.get_frontal_face_detector()

    shape = dlib.shape_predictor(
        face_recognition_models.pose_predictor_model_location()
    )

    facerec = dlib.face_recognition_model_v1(
        face_recognition_models.face_recognition_model_location()
    )

    _dlib_models = detector, shape, facerec

    return _dlib_models


def get_face_embeddings(image_np):

    detector, sp, facerec = load_dlib_models()

    faces = detector(image_np,1)

    # [<dlib.rectangle object at 0x7f8b1c2a3d90>, <dlib.rectangle object at 0x7f8b1c2a3e50>]
    # faces[0] : (120, 50, 320, 250)
    # faces[1] : (450, 100, 600, 250)
    # upscale 2x 

    encodings = []

    for face in faces:

        shape = sp(image_np, face)

        # <dlib.full_object_detection object at 0x...>
        # (68 facial landmarks)
        # p = shape.part(i) -> (p.x, p.y) coordinate

        face_decriptor = facerec.compute_face_descriptor(
            image_np,
            shape,
            1
        )
        # face_decriptor -> (128,) array list

        encodings.append(np.array(face_decriptor))
        # encodings -> [(128,), (128,), ...]

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


def predict_faces(class_image_np, clf, X, y):

    if clf is None:
        return []

    if len(X) == 0 or len(y) == 0:
        return []

    encodings = get_face_embeddings(class_image_np)

    if not encodings:
        return []

    detected_students = []

    resemblance_threshold = 0.6

    for encoding in encodings:

        predicted_id = clf.predict([encoding])[0]
        # List of predicted IDs so use [0] to get the first one

        predicted_id = int(predicted_id)

        student_index = y.index(predicted_id)

        student_embedding = X[student_index]

        best_match_score = np.linalg.norm(
            student_embedding - encoding
        )

        if best_match_score <= resemblance_threshold:

            detected_students.append(predicted_id)

    return detected_students

def clear_model_cache():

    global _dlib_models
    global _trained_classifier

    _dlib_models = None
    _trained_classifier = None