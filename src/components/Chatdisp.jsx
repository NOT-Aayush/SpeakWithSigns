function Chatdisp({ transcript }) {
    return (
        <div className="chatbox">
            {transcript.map((entry, i) => (
                <div key={i} className="message-block">
                    <span className="speaker-name">{entry.speaker}: </span>
                    <span className="speaker-words">{entry.words.join(" ")}</span>
                </div>
            ))}
        </div>
    );
}

export default Chatdisp;