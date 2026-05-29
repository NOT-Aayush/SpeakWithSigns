import Vidbox from "../components/Video_box.jsx";
import Chatdisp from "../components/Chatdisp.jsx";
import { useState } from "react";

function User(){
    const [detectedName, setDetectedName] = useState("System");
    const [Currentword, setCurrentWord] = useState("Welcome")
    return(
        <>
        <div className="Container">
                <Vidbox setDetectedName={setDetectedName}
                setCurrentWord={setCurrentWord}/>
                <Chatdisp person={detectedName}
                words={Currentword}/>
        </div>
        </>
    )
}

export default User;