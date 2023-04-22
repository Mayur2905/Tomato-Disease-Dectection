from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from io import BytesIO
import numpy as np
from PIL import Image
#import tensorflow as tf
import requests
#import json


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



endpoint = "http://localhost:8501/v1/models/Tomato_disease:predict"
#MODEL = tf.keras.models.load_model("../saved_models/5")

CLASS_NAMES = ["Tomato Bacterial spot", "Tomato Early blight", "Tomato Late blight", "Tomato Leaf Mold",
               "Tomato Sectorial leaf spot", "Tomato Spider mites Two-spotted spider mite", "Tomato Target Spot",
               "Tomato Yellow Leaf Curl Virus", "Tomato Mosaic virus", "Tomato healthy"]
@app.get("/ping")
async def ping():
    return "hello ,I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    # prediction = MODEL.predict(img_batch)
    # predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    # confidence = np.max(prediction[0])


    json_data = {
        "instances": img_batch.tolist()
    }
    try:
        response = requests.post(endpoint, json=json_data, timeout=1)
        prediction = np.array(response.json()["predictions"][0])
        predicted_class = CLASS_NAMES[np.argmax(prediction)]
        confidence = np.max(prediction)
        return {
            "class": predicted_class,
            "confidence": float(confidence)
        }
    except requests.exceptions.Timeout:
        return {"error": "Request timed out."}

    # response = requests.post(endpoint, json=json_data)
    # #prediction = json.loads(response.json()['predictions'])
    # prediction = np.array(response.json()["predictions"][0])
    #
    # predicted_class = CLASS_NAMES[np.argmax(prediction)]
    # confidence = np.max(prediction)
    #
    # return {
    #     "class": predicted_class,
    #     "confidence": float(confidence)



if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8080)
