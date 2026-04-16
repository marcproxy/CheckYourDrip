import os
import base64
import tempfile
import threading
from datetime import datetime, timezone
from pathlib import Path

import cv2
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ultralytics import YOLO
from dotenv import load_dotenv
import psycopg2
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
from bson import ObjectId

# ── Env ───────────────────────────────────────────────────────────────────────
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="CheckYourDrip API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Model ─────────────────────────────────────────────────────────────────────
MODEL_PATH = os.getenv("MODEL_PATH", "model/best.pt")
model = YOLO(MODEL_PATH)

CLASS_NAME_OVERRIDE = {
    "0": "headwear",
    "1": "fashion_item",
}

# ── DB helpers ────────────────────────────────────────────────────────────────
def get_pg_conn():
    return psycopg2.connect(os.getenv("DATABASE_URL"), sslmode="require")

def pg_insert_detection(object_class: str, confidence: float) -> int:
    conn = get_pg_conn()
    with conn, conn.cursor() as cur:
        cur.execute(
            "INSERT INTO detections (object_class, confidence) VALUES (%s, %s) RETURNING id",
            (object_class, confidence),
        )
        row_id = cur.fetchone()[0]
    conn.close()
    return row_id

def pg_update_mongo_id(pg_id: int, mongo_id: str):
    conn = get_pg_conn()
    with conn, conn.cursor() as cur:
        cur.execute("UPDATE detections SET mongo_id = %s WHERE id = %s", (mongo_id, pg_id))
    conn.close()

def get_mongo_logs():
    client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
    db = client[os.getenv("MONGO_DB", "db-CheckYourDrip")]
    return client, db["Logs"]

def mongo_insert_log(photo_url: str, object_class: str, pg_id: int):
    client, logs = get_mongo_logs()
    doc = {
        "objectId": ObjectId(),
        "dateLog": datetime.now(timezone.utc),
        "photo": photo_url,
        "verification": False,
        "objectClass": object_class,
        "pgDetectionId": pg_id,
    }
    result = logs.insert_one(doc)
    client.close()
    return str(result.inserted_id)

def upload_frame_cloudinary(frame_bgr: np.ndarray) -> str:
    success, buffer = cv2.imencode(".jpg", frame_bgr)
    if not success:
        raise RuntimeError("Impossible d'encoder le frame en JPEG")
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        tmp.write(buffer.tobytes())
        tmp_path = tmp.name
    try:
        result = cloudinary.uploader.upload(
            tmp_path,
            folder="checkyourdrip/detections",
            resource_type="image",
        )
        return result["secure_url"]
    finally:
        os.unlink(tmp_path)

def save_detection_bg(frame_bgr: np.ndarray, object_class: str, confidence: float):
    try:
        pg_id = pg_insert_detection(object_class, confidence)
        photo_url = upload_frame_cloudinary(frame_bgr)
        mongo_id = mongo_insert_log(photo_url, object_class, pg_id)
        pg_update_mongo_id(pg_id, mongo_id)
        print(f"[saved] pg={pg_id} mongo={mongo_id} photo={photo_url}")
    except Exception as e:
        print(f"[ERROR save] {e}")

# ── Schemas ───────────────────────────────────────────────────────────────────
class DetectRequest(BaseModel):
    image: str  # base64 JPEG

class SaveRequest(BaseModel):
    image: str   # base64 JPEG
    object_class: str
    confidence: float

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/detect")
def detect(req: DetectRequest):
    """Reçoit un frame base64, retourne les détections YOLO."""
    try:
        img_data = base64.b64decode(req.image.split(",")[-1])
        np_arr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            raise HTTPException(status_code=400, detail="Image invalide")

        results = model(frame, conf=0.3, verbose=False)
        boxes = results[0].boxes

        detections = []
        if boxes is not None:
            for box in boxes:
                raw_name = model.names[int(box.cls[0])]
                class_name = CLASS_NAME_OVERRIDE.get(raw_name, raw_name)
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                detections.append({
                    "class": class_name,
                    "confidence": float(box.conf[0]),
                    "bbox": [x1, y1, x2, y2],
                })

        return {"detections": detections}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
def history(limit: int = 50):
    """Retourne les dernières détections depuis MongoDB."""
    try:
        client, logs = get_mongo_logs()
        cursor = logs.find().sort("dateLog", -1).limit(limit)
        result = []
        for doc in cursor:
            result.append({
                "id": str(doc["_id"]),
                "objectClass": doc.get("objectClass", ""),
                "dateLog": doc.get("dateLog", "").isoformat() if doc.get("dateLog") else "",
                "photo": doc.get("photo", ""),
                "verification": doc.get("verification", False),
                "pgDetectionId": doc.get("pgDetectionId"),
            })
        client.close()
        return {"logs": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/save")
def save(req: SaveRequest):
    """Sauvegarde une détection validée (PG + Cloudinary + MongoDB)."""
    try:
        img_data = base64.b64decode(req.image.split(",")[-1])
        np_arr = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            raise HTTPException(status_code=400, detail="Image invalide")

        threading.Thread(
            target=save_detection_bg,
            args=(frame, req.object_class, req.confidence),
            daemon=True,
        ).start()

        return {"status": "saving"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
