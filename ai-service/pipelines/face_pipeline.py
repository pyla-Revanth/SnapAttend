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