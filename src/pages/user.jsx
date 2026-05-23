import Vidbox from "../components/Video_box";
import Upbar from "../components/Upbar";
import Chatdisp from "../components/Chatdisp";

function User(){

    const Container = styled.div`
    display: flex
    height: 100vh
    `

    return(
        <>
        <Container>
            <div className="intro">
                <Upbar />
            </div>
            <div className="videobox">
                <Vidbox />
            </div>
            <div className="chatbox">
                <Chatdisp />
            </div>
        </Container>
        </>
    )
}

export default User;