import io
import json

import numpy as np
from PIL import Image
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from pipelines.face_pipeline import (
    build_training_data,
    train_classifier,
    predict_faces,
    get_face_embeddings,
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
            return {
                "recognized": False,
                "student_id": None,
            }

        detected_students = predict_faces(
            image_np,
            classifier,
            X,
            y,
        )
        
        if len(detected_students) == 0:
            return {
                "recognized": False,
                "student_id": None,
            }

        if len(detected_students) > 1:
            return {
                "recognized": False,
                "student_id": None,
            }

        student_id = detected_students[0]

        return {
            "recognized": True,
            "student_id": int(student_id),
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


@router.post("/embedding")
async def generate_face_embedding(
    image : UploadFile = File(...),
):
    try:
        image_bytes = await image.read()
        
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")
        
        image_np = np.array(image)
        
        embeddings = get_face_embeddings(image_np)
        
        if len(embeddings) == 0:
            raise HTTPException(
                status_code=400,
                detail="No face detected.",
            )

        if len(embeddings) > 1:
            raise HTTPException(
                status_code=400,
                detail="Multiple faces detected. Please capture only one face.",
            )

        embedding = embeddings[0]
        
        return {
            "success": True,
            "embedding": embedding.tolist(),
        }
        
    except HTTPException:
        raise

    except Exception as error:
        print("Face embedding error:", error)

        raise HTTPException(
            status_code=500,
            detail="Face embedding generation failed.",
        )
