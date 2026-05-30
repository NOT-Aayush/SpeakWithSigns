import * as faceapi from "face-api.js";
import canvas from "canvas";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const MODEL_PATH = "./backend/fmodels";

const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
    console.log("models loaded");
};

export const modelsLoaded = loadModels();

export const toDescriptors = async (base64) => {
    try {
        await modelsLoaded;
        // convert base64 to canvas Image
        const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const img = await canvas.loadImage(buffer);

        const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            console.log("No face detected");
            return null;
        }

        return Array.from(detection.descriptor);

    } catch(err) {
        console.error(err);
        return null;
    }
};
