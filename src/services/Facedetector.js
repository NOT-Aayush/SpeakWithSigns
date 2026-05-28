import * as faceapi from 'face-api.js';

export const loadFaceModels = async () => {

    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

}

export const detectFaces = async (video) => {

    return await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceDescriptors();
}