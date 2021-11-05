import flask
from flask import Flask, jsonify, flash, request, redirect, url_for
from flask_cors import CORS
from common import get_prediction
import os


data_dir = './data'
UPLOAD_FOLDER = './data/demo_imgs'

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['GET'])
def predict():
    recipe = get_prediction(data_dir)
    # print(jsonify(recipe))
    #return jsonify(recipe)
    return recipe
    # return "Hello World!"




if __name__ == "__main__":
    app.run(port='80')
