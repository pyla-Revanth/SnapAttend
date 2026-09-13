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

        # Extract audio format from content type or filename
        audio_format = "webm"  # default
        content_type = audio.content_type or ""
        filename = audio.filename or ""

        if "webm" in content_type or filename.endswith(".webm"):
            audio_format = "webm"
        elif "wav" in content_type or filename.endswith(".wav"):
            audio_format = "wav"
        elif "mp3" in content_type or filename.endswith(".mp3"):
            audio_format = "mp3"
        elif "m4a" in content_type or filename.endswith(".m4a"):
            audio_format = "m4a"
        elif "ogg" in content_type or filename.endswith(".ogg"):
            audio_format = "ogg"

        embedding = get_voice_embedding(audio_bytes, audio_format)

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
        raise HTTPException(
            status_code=500,
            detail="Voice embedding generation failed.",
        )