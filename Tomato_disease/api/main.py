from fastapi import FastAPI, UploadFile, File
import uvicorn
from io import BytesIO
import numpy as np
from PIL import Image
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model("../saved_models/5")
CLASS_NAMES = ["Tomato Bacterial spot", "Tomato Early blight", "Tomato Late blight", "Tomato Leaf Mold",
               "Tomato Sectorial leaf spot", "Tomato Spider mites Two-spotted spider mite", "Tomato Target Spot",
               "Tomato Tomato Yellow Leaf Curl Virus", "Tomato Tomato Mosaic virus", "Tomato healthy"]


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
    prediction = MODEL.predict(img_batch)
    prediction_class = CLASS_NAMES[np.argmax(prediction[0])]
    confidence = np.max(prediction[0])
    return{
        'class': prediction_class,
        'confidence': float(confidence)
    }

    pass

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8080)
