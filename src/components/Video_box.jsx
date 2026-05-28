import React, { useRef,useEffect,useState } from 'react';
import Webcam from 'react-webcam';
import { detectFaces, loadFaceModels } from '../services/Facedetector';
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { drawHands, drawFace } from '../utils/DrawingLandmarks';
import * as tf from "@tensorflow/tfjs";

function Vidbox({ setDetectedName }) {

    // refs
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const handLandmarkerRef = useRef(null);
    const modelRef = useRef(null);

    //loading model
    const loadSignModel = async () => {

        modelRef.current = await tf.loadLayersModel(
            "/handsmodel/model.json"
        );

        console.log("sign model loaded");
    };

   
    //loading mediapipe handsdetector
    const initializeHands = async () =>{
    const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    const handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
        baseOptions: {
            modelAssetPath: "/handsmodel/hand_landmarker.task"
        },
        runningMode: "VIDEO",
        numHands: 1
        });
    handLandmarkerRef.current = handLandmarker;
    console.log("mediapipe model loaded");
    };


    useEffect(()=>{
        let timestamp = 0;
        let interval;
        const initialize = async () =>{
            await loadSignModel();
            await initializeHands();
            await loadFaceModels();
            let frameCount =0;
            let processing = false;
            
            interval = setInterval(async ()=>{
                frameCount++;
                //setting video n canvas
                if (!videoRef.current || !videoRef.current.video) return;
                const video = videoRef.current.video;
                if (video.readyState !==4) return;
                
                //initializing mesh
                const canvas = canvasRef.current;
                if (!canvas) return;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                ctx.clearRect(0,0,canvas.width,canvas.height);

                //make detections
                if (processing) return;
                processing = true;
                try {

                    if (handLandmarkerRef.current){
                        timestamp +=33;
                        const results = handLandmarkerRef.current.detectForVideo(video,timestamp);
                        drawHands(results, ctx, canvas);
                    }
                    if  (frameCount % 10 ===0){
                        let detectedName = "Unknown";
                        const facedetections = await detectFaces(video);
                        for (const face of facedetections){

                            const descriptorArray = Array.from(face.descriptor);

                            const response = await fetch("http://localhost:8002/user/getface",
                                {
                                    method: "POST",
                                    headers:{
                                        "Content-Type":"application/json"
                                    },
                                    body: JSON.stringify({
                                        descriptor: descriptorArray
                                    })
                                }
                            );
                            const data = await response.json();
                            detectedName = data.match.person.name;
                            setDetectedName(detectedName);
                        }
                        drawFace(facedetections, ctx, detectedName);
                        
                    }
                }finally {
                    processing = false;
                }
            },30);
        }
        initialize();
        return ()=> clearInterval(interval);
    },[]);
    return(
        <div className='videobox'>

            <Webcam
                className='webcam'
                mirrored={false}
                ref={videoRef}
                videoConstraints={{
                    width: 1280,
                    height: 720,
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
