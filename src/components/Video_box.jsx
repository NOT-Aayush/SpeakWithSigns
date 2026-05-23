import * as faceapi from 'face-api.js'
import React,{ useRef, useEffect, useState } from 'react';
function Vidbox(){
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [name, setName] = useState();
    const [message, Setmessage] = useState();

    useEffect(() =>{
        startCamera();
        const timeoutId = setTimeout(() =>{
            captureImage();

        }, 2000)

        return () => clearTimeout(timeoutId);
    },[]);

    return(
        <>
        <video id="inp" width={"720"} height={"560"} autoplay muted></video>
        </>
    )
}
export default Vidbox;