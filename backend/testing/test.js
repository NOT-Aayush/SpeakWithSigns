import * as faceapi from "face-api.js";
import canvas from "canvas";
import pool from "../config/db.js";

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({
    Canvas,
    Image,
    ImageData
});

const addPerson = async () => {

    try {

        const MODEL_PATH = "./backend/fmodels";

        // load models
        await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_PATH);

        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);

        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);

        console.log("models loaded");

        // load image
        const img = await canvas.loadImage("./backend/uploads/test.jpg");

        // detect face
        const detection = await faceapi
            .detectSingleFace(
                img,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            console.log("No face detected");
            return;
        }

        // convert descriptor
        const descriptorArray = Array.from(detection.descriptor);

        console.log(descriptorArray.length);

        // insert into db
        await pool.query(
            `
            INSERT INTO persons(name, face_descriptor)
            VALUES($1,$2)
            `,
            [
                "Aayush",
                JSON.stringify(descriptorArray)
            ]
        );
        console.log("person inserted");

    } catch(err) {

        console.error(err);

    } finally {

        await pool.end();
    }
};

addPerson();