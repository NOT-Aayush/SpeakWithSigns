import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { detectFaces, loadFaceModels } from '../services/Facedetector';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { drawHands, drawFace } from '../utils/DrawingLandmarks';
import { preprocessLandmarks } from '../utils/PreprocessingLandmarks';
import { loadSignModel, predictSign } from '../services/Signpredictor';
import { StabilityBuffer } from '../utils/StabilityBuffer';

// --- CHANGE 1: detect mobile once, use it to scale everything below ---
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

function Vidbox({ setDetectedName, setCurrentWord }) {
    const API_URL = import.meta.env.VITE_API_URL;

    // refs
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const handLandmarkerRef = useRef(null);
    const modelRef = useRef(null);

    const wordBufferRef = useRef(new StabilityBuffer(10, 0.6));
    const nameBufferRef = useRef(new StabilityBuffer(5, 0.8));

    // loading mediapipe hands detector
    const initializeHands = async () => {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const handLandmarker = await HandLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath: "/handsmodel/hand_landmarker.task",
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 1
            }
        );
        handLandmarkerRef.current = handLandmarker;
    };

    useEffect(() => {
        let rafId;
        let running = true;

        const HAND_INTERVAL_MS = isMobile ? 100 : 33;
        const FACE_EVERY_N_FRAMES = isMobile ? 30 : 10; // face recognition runs less often

        let lastHandRun = 0;
        let frameCount = 0;
        let processingHand = false;
        let processingFace = false; // guards the face branch independently

        const initialize = async () => {
            await loadSignModel();
            await initializeHands();
            await loadFaceModels();

            const runFaceRecognition = async (video, ctx) => {
                let detectedName = "Unknown";
                const facedetections = await detectFaces(video);

                for (const face of facedetections) {
                    const descriptorArray = Array.from(face.descriptor);

                    fetch(`${API_URL}/user/getface`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ descriptor: descriptorArray })
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.match?.person?.name) {
                                nameBufferRef.current.add(data.match.person.name);
                                const stableName = nameBufferRef.current.getStable();
                                if (stableName) {
                                    setDetectedName(stableName);
                                }
                            }
                        })
                        .catch((err) => console.error("getface fetch failed:", err));
                }

                if (ctx) drawFace(facedetections, ctx, detectedName);
            };

            const loop = async (timestamp) => {
                if (!running) return;

                if (!videoRef.current || !videoRef.current.video) {
                    rafId = requestAnimationFrame(loop);
                    return;
                }
                const video = videoRef.current.video;
                if (video.readyState !== 4) {
                    rafId = requestAnimationFrame(loop);
                    return;
                }

                const canvas = canvasRef.current;
                if (!canvas) {
                    rafId = requestAnimationFrame(loop);
                    return;
                }

                if (timestamp - lastHandRun >= HAND_INTERVAL_MS && !processingHand) {
                    lastHandRun = timestamp;
                    processingHand = true;
                    frameCount++;

                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext("2d");

                    try {
                        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

                        if (handLandmarkerRef.current && ctx) {
                            const results = handLandmarkerRef.current.detectForVideo(
                                video,
                                timestamp
                            );

                            drawHands(results, ctx, canvas);

                            if (results.landmarks && results.landmarks.length > 0) {
                                const landmarks = results.landmarks[0];
                                const preprocessedLandmarks = preprocessLandmarks(landmarks);
                                const word = await predictSign(preprocessedLandmarks);
                                wordBufferRef.current.add(word);
                                const stableWord = wordBufferRef.current.getStable();
                                if (stableWord) setCurrentWord(stableWord);
                            }
                        }

                        if (frameCount % FACE_EVERY_N_FRAMES === 0 && !processingFace) {
                            processingFace = true;
                            runFaceRecognition(video, ctx)
                                .catch((err) => console.error("Face recognition error:", err))
                                .finally(() => { processingFace = false; });
                        }
                    } finally {
                        processingHand = false;
                    }
                }

                rafId = requestAnimationFrame(loop);
            };

            rafId = requestAnimationFrame(loop);
        };

        initialize();

        return () => {
            running = false;
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className='videobox'>
            <Webcam
                className='webcam'
                mirrored={false}
                ref={videoRef}
                videoConstraints={{
                    width: isMobile ? 640 : 1280,
                    height: isMobile ? 480 : 720,
                    facingMode: "user"
                }}
            />

            <canvas
                className='overlay'
                ref={canvasRef}
            />
        </div>
    )
}

export default Vidbox;