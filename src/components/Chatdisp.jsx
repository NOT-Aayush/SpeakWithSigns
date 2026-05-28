import { useState } from "react";

function Chatdisp({ person, words }) {
    const [chatMessages, setChatMessages] = useState([]);
    
    return (
        <div className="chatbox">

            <div className="speaker">

                <h2 className="speaker-name">
                    {person || "Unknown"}:
                </h2>

                <h3 className="speaker-words">
                    {words || "still on work"}
                </h3>

            </div>

        </div>
    );
}

export default Chatdisp;