import io

from fastapi import APIRouter, UploadFile, File, HTTPException

from pipelines.voice_pipeline import get_voice_embedding


router = APIRouter()


@router.post("/embedding")
async def generate_voice_embedding(
    audio: UploadFile = File(...),
):
    try:
        audio_bytes = await audio.read()

        if not audio_bytes:
            raise HTTPException(
                status_code=400,
                detail="Audio is required.",
            )

        embedding = get_voice_embedding(audio_bytes)

        if embedding is None:
            raise HTTPException(
                status_code=400,
                detail="Failed to generate voice embedding.",
            )

        return {
            "success": True,
            "embedding": embedding,
        }

    except HTTPException:
        raise

    except Exception as error:
        print("Voice embedding error:", error)

        raise HTTPException(
            status_code=500,
            detail="Voice embedding generation failed.",
        )