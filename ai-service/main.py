from fastapi import FastAPI

from api.face_routes import router as face_router


app = FastAPI(
    title="SnapAttend AI Service",
    version="1.0.0",
)


app.include_router(
    face_router,
    prefix="/face",
    tags=["Face Recognition"],
)


@app.get("/health")
def health_check():

    return {
        "success": True,
        "message": "SnapAttend AI Service is running",
    }