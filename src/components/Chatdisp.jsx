import { useRef, useEffect } from "react";

function Chatdisp({ transcript }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [transcript]);
    return (
        <div className="chatbox">
            <h2 className="chat-heading">Messages</h2>
            {transcript.map((entry, i) => (
                <div key={i} className="message-block">
                    <span className="speaker-name">{entry.speaker}: </span>
                    <span className="speaker-words">{entry.words.join(" ")}</span>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
}

export default Chatdisp;