import boto3
import tensorflow as tf
from PIL import Image
import numpy as np

model = None
interpreter = None
input_index = None
output_index = None

CLASS_NAMES = ["Tomato Bacterial spot", "Tomato Early blight", "Tomato Late blight", "Tomato Leaf Mold",
               "Tomato Sectorial leaf spot", "Tomato Spider mites Two-spotted spider mite", "Tomato Target Spot",
               "Tomato Yellow Leaf Curl Virus", "Tomato Mosaic virus", "Tomato healthy"]

BUCKET_NAME = 'Tomato_disease_app'
MODEL_KEY = 'models/tomato.h5'

def download_model(bucket_name, key):
    s3 = boto3.resource('s3')
    s3.Bucket(bucket_name).download_file(key, '/tmp/potatoes.h5')

def predict(request):
    global model
    if model is None:
        download_model(BUCKET_NAME, MODEL_KEY)
        model = tf.keras.models.load_model('/tmp/potatoes.h5')
    image = request.files["file"]

    image = np.array(
        Image.open(image).convert("RGB").resize((256, 256)) # image resizing
    )

    image = image/255 # normalize the image in 0 to 1 range

    img_array = tf.expand_dims(image, 0)
    predictions = model.predict(img_array)

    print("Predictions:",predictions)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = round(100 * (np.max(predictions[0])), 2)

    return {"class": predicted_class, "confidence": confidence}
