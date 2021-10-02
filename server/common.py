from collections import Counter
import random
from io import BytesIO
import sys
import torch
import torch.nn as nn
import numpy as np
import os
from args import get_parser
import pickle
from model import get_model
from torchvision import transforms, models
from utils.output_utils import prepare_output
from PIL import Image
import time
import io
import sys
sys.argv = ['']
del sys


def get_prediction(data_dir):
    use_gpu = False
    device = torch.device(
        'cuda' if torch.cuda.is_available() and use_gpu else 'cpu')
    map_loc = None if torch.cuda.is_available() and use_gpu else 'cpu'

    ingrs_vocab = pickle.load(
        open(os.path.join(data_dir, 'ingr_vocab.pkl'), 'rb'))
    vocab = pickle.load(open(os.path.join(data_dir, 'instr_vocab.pkl'), 'rb'))

    ingr_vocab_size = len(ingrs_vocab)
    instrs_vocab_size = len(vocab)
    output_dim = instrs_vocab_size

    args = get_parser()
    args.maxseqlen = 15
    args.ingrs_only = False
    model = get_model(args, ingr_vocab_size, instrs_vocab_size)

    # Load the trained model parameters
    model_path = os.path.join(data_dir, 'modelbest.ckpt')
    model.load_state_dict(torch.load(model_path, map_location=map_loc))
    model.to(device)
    model.eval()
    model.ingrs_only = False
    model.recipe_only = False

    transf_list_batch = []
    transf_list_batch.append(transforms.ToTensor())
    transf_list_batch.append(transforms.Normalize((0.485, 0.456, 0.406),
                                                  (0.229, 0.224, 0.225)))
    to_input_transf = transforms.Compose(transf_list_batch)

    # set to true to load images from demo_urls instead of those in test_imgs folder
    use_urls = False
    show_anyways = False  # if True, it will show the recipe even if it's not valid
    image_folder = os.path.join(data_dir, 'demo_imgs')

    if not use_urls:
        demo_imgs = os.listdir(image_folder)
        random.shuffle(demo_imgs)

    demo_files = demo_imgs

    for img_file in demo_files:
        image_path = os.path.join(image_folder, img_file)
        image = Image.open(image_path).convert('RGB')

        transf_list = []
        transf_list.append(transforms.Resize(256))
        transf_list.append(transforms.CenterCrop(224))
        transform = transforms.Compose(transf_list)

        image_transf = transform(image)
        image_tensor = to_input_transf(image_transf).unsqueeze(0).to(device)

    greedy = [True, False, False, False]
    beam = [-1, -1, -1, -1]
    temperature = 1.0
    numgens = len(greedy)
    num_valid = 1
    for i in range(1):
        with torch.no_grad():
            outputs = model.sample(
                image_tensor, greedy=greedy[i], temperature=temperature, beam=beam[i], true_ingrs=None)

        ingr_ids = outputs['ingr_ids'].cpu().numpy()
        recipe_ids = outputs['recipe_ids'].cpu().numpy()

        outs, valid = prepare_output(
            recipe_ids[0], ingr_ids[0], ingrs_vocab, vocab)

        if valid['is_valid'] or show_anyways:

            recipe = {
                "title": outs['title'],
                "ingredients": outs['ingrs'],
                "instruction": outs['recipe']
            }

            print('RECIPE', num_valid)
            num_valid += 1
            print("greedy:", greedy[i], "beam:", beam[i])
            BOLD = '\033[1m'
            END = '\033[0m'
            print(BOLD + '\nTitle:' + END, outs['title'])

            print(BOLD + '\nIngredients:' + END)
            print(', '.join(outs['ingrs']))

            print(BOLD + '\nInstructions:'+END)
            print('-'+'\n-'.join(outs['recipe']))

            print('='*20)
        else:
            pass
            print("Not a valid recipe!")
            print("Reason: ", valid['reason'])

    filename = './data/' + 'demo_imgs/'
    for file in os.listdir(filename):
        demo_imgs = os.listdir(filename)
        for img_file in demo_files:
            image_path = os.path.join(image_folder, img_file)
            print(image_path)
            os.remove(image_path)
            pass
    return recipe
