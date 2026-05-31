import Vidbox from "../components/Video_box.jsx";
import Chatdisp from "../components/Chatdisp.jsx";
import { useState, useRef } from "react";
import "../css/User.css"
function User(){
    const [detectedName, setDetectedName] = useState("System");
    const [transcript, setTranscript] = useState([]);
    const lastNameRef = useRef("System");
    const cooldownRef = useRef(false);

    const handleNameChange = (name) => {
        if (name !== lastNameRef.current) {
            lastNameRef.current = name;
            setDetectedName(name);
            setTranscript(prev => [...prev, { speaker: name, words: [] }]);
        }
    };

    const handleWordChange = (word) => {
        if (word==='space') word = "_";
        if (cooldownRef.current) return; 
        
        cooldownRef.current = true;
        setTimeout(() => { cooldownRef.current = false; }, 1500);
        
        setTranscript(prev => {
            if (prev.length === 0) {
                return [{ speaker: lastNameRef.current, words: [word] }];
            }
            const updated = [...prev];
            const last = { ...updated[updated.length - 1] };
            last.words = [...last.words, word];
            updated[updated.length - 1] = last;
            return updated;
        });
    };

    return(
        <div className="Container">
            <Vidbox setDetectedName={handleNameChange} setCurrentWord={handleWordChange}/>
            <Chatdisp transcript={transcript}/>
        </div>
    )
}

export default User;