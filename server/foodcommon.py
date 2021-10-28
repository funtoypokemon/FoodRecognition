import tensorflow as tf
import numpy as np
import os
import os.path
import cv2
from tensorflow.keras.models import load_model
import sys
import keras
import keras_applications
from keras.models import load_model
from keras.utils.generic_utils import CustomObjectScope
import keras
from keras.applications import MobileNet



data_dir = './data'
# def get_food_prediction(data_dir):


model_path = os.path.join(data_dir, 'mobilenet_weights_mc2.h5')


# with CustomObjectScope({'relu6': keras.applications.mobilenet.relu6,'DepthwiseConv2D': keras.applications.mobilenet.DepthwiseConv2D}):
#     model = load_model(model_path)



with CustomObjectScope({'relu6': keras.layers.ReLU(6.),'DepthwiseConv2D': keras.layers.DepthwiseConv2D}):
   model = load_model(model_path)

classes = ['banhmi', 'donut', 'dumplings', 'goicuon', 'seaweedsalad', 'waffle']
image_folder = os.path.join(data_dir, 'demo_imgs')
demo_imgs = os.listdir(image_folder)
demo_files = demo_imgs
for img_file in demo_files:
    image_path = os.path.join(image_folder, img_file)
    image = cv2.imread(image_path)
    image = cv2.resize(image,(224, 224))
    image = image.astype('float') * 1./255
    image = np.expand_dims(image, axis=0)
    predictions = np.argmax(model.predict(image))
    print("This picture is: ", classes[predictions])


    
    