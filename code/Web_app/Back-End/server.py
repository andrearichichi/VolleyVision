from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import json
import uvicorn
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.editor import concatenate_videoclips, TextClip, CompositeVideoClip
from ultralytics import YOLO
from time import sleep
import shutil


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIRECTORY = "videos"
CLIPS_DIRECTORY = "clips"

if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY)

if not os.path.exists(CLIPS_DIRECTORY):
    os.makedirs(CLIPS_DIRECTORY)

@app.post("/upload-video/")
async def upload_video(file: UploadFile = File(...), shortcuts: str = Form(...)):
    try:
        file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
        
        shortcuts_data = json.loads(shortcuts)
        with open("shortcuts.json", "w") as f:
            json.dump(shortcuts_data, f, indent=4)
        
        video_clip = VideoFileClip(file_location)
        clips = []
        for shortcut in shortcuts_data:
            start_time = float(shortcut['time'])
            end_time = start_time + 3
            clip = video_clip.subclip(start_time, min(end_time, video_clip.duration))

            text = f"{shortcut['title']} - {shortcut['description']}"
            txt_clip = (TextClip(text, fontsize=50, font='Amiri-Bold', color='white', bg_color='#5cb9ff')
                        .set_position(("right", "top"))
                        .set_duration(clip.duration))

            video = CompositeVideoClip([clip, txt_clip])
            clips.append(video)

        final_clip = concatenate_videoclips(clips)
        final_clip_location = os.path.join(CLIPS_DIRECTORY, "final_clip.mp4")
        final_clip.write_videofile(final_clip_location, codec="libx264")

        return FileResponse(final_clip_location, media_type='video/mp4', filename="final_clip.mp4")
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})

import logging

logging.basicConfig(level=logging.ERROR)

VIDEOS_AI_DIRECTORY = "videos-ai"

if not os.path.exists(VIDEOS_AI_DIRECTORY):
    os.makedirs(VIDEOS_AI_DIRECTORY)

@app.post("/ai-video/")
async def ai_video(file: UploadFile = File(...), recognitionOption: str = Form(...)):
    try:
        file_location = os.path.join(VIDEOS_AI_DIRECTORY, "video_ai.mp4")
        
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())

        # Select the appropriate model based on the user's choice
        if recognitionOption == "ballRecognition":
            classes = 32
        elif recognitionOption == "playerRecognition":
            classes = 0
        else:
            return JSONResponse(status_code=400, content={"message": "Invalid recognition option selected."})
        
        
        model = YOLO('../weights/players_2.pt')
        confidence = 0.4
        result = model.predict(source=file_location,classes=classes, conf=confidence, save=True)
        processed_video_path = "runs/detect/predict/video_ai.mp4"
        
        return FileResponse(processed_video_path, media_type='video/mp4', filename="final_clip.mp4")
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {str(e)}"})


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
