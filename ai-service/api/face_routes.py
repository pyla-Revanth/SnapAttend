import io
import json

import numpy as np
from PIL import Image
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from pipelines.face_pipeline import (
    build_training_data,
    train_classifier,
    predict_faces,
)


router = APIRouter()


@router.post("/predict")
async def predict_face(
    image: UploadFile = File(...),
    students: str = Form(...),
):

    try:
        image_bytes = await image.read()

        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        image_np = np.array(image)

        student_data = json.loads(students)

        X, y = build_training_data(student_data)

        classifier = train_classifier(X, y)

        if classifier is None:
            raise HTTPException(
                status_code=400,
                detail="Not enough student face data to perform recognition.",
            )

        detected_students = predict_faces(
            image_np,
            classifier,
            X,
            y,
        )

        return {
            "success": True,
            "student_ids": detected_students,
        }

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=400,
            detail="Invalid student data.",
        )

    except HTTPException:
        raise

    except Exception as error:
        print("Face prediction error:", error)

        raise HTTPException(
            status_code=500,
            detail="Face recognition failed.",
        )