import tensorflow as tf
import numpy as np
import os
import os.path
import cv2



def get_food_prediction(data_dir):

    image_folder = os.path.join(data_dir, 'demo_imgs')
    demo_imgs = os.listdir(image_folder)
    demo_files = demo_imgs
    for img_file in demo_files:
        image_path = os.path.join(image_folder, img_file)
        image = cv2.imread(image_path)
        image = cv2.resize(224, 224, 3)


    classes = ['banhmi', 'banhtet', 'banhxeo', 'bundaumamtom', 'comtam', 'donut', 'dumplings'
    , 'frenchfried', 'friedegg', 'goicuon', 'hamburger', 'hau', 'pho', 'pizza', 'seaweedsalad', 'waffle']
    