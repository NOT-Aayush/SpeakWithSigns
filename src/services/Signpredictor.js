import * as tf from "@tensorflow/tfjs";
import * as tflite from "@tensorflow/tfjs-tflite";

let model = null;

const labels = [
    'A','B','C','D','E','F','G','H','I',
    'J','K','L','M','N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z',
    'del','nothing','space'
];


export const loadSignModel = async () => {
  // Must be called before loadTFLiteModel, not inside it
  await tflite.setWasmPath('/tflite/');

  model = await tflite.loadTFLiteModel('/handsmodel/sign_model.tflite');
  console.log("loaded");
};


export const predictSign = async (landmark_flat) => {

    if (!model) return null;

    const input = tf.tensor2d(
        [landmark_flat],
        [1,63]
    );

    const output = model.predict(input);

    const data = await output.data();

    let maxIndex = 0;

    for (let i = 1; i < data.length; i++) {
        if (data[i] > data[maxIndex]) {
            maxIndex = i;
        }
    }

    input.dispose();
    output.dispose();
    return labels[maxIndex];
};