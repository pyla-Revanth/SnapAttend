from fastapi import FastAPI

from api.face_routes import router as face_router
from api.voice_routes import router as voice_router

app = FastAPI(
    title="SnapAttend AI Service",
    version="1.0.0",
)


app.include_router(
    face_router,
    prefix="/face",
    tags=["Face Recognition"],
)

app.include_router(
    voice_router,
    prefix="/voice",
    tags=["Voice Recognition"]
)

@app.get("/health")
def health_check():

    return {
        "success": True,
        "message": "SnapAttend AI Service is running",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
    )