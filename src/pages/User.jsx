import Vidbox from "../components/Video_box.jsx";
import Chatdisp from "../components/Chatdisp.jsx";
import { useState } from "react";

function User(){
    const [detectedName, setDetectedName] = useState("");
    return(
        <>
        <div className="Container">
                <Vidbox setDetectedName={setDetectedName}/>
                <Chatdisp person={detectedName}/>
        </div>
        </>
    )
}

export default User;