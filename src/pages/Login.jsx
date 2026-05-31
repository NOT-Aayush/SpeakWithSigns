import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"
function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const authenticateService = async (amail,pass)=>{
        setError("");
        setLoading(true);
            try{
            const response = await fetch("http://localhost:8002/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: amail, password: pass })
            })
            const data = await response.json();
            if (!response.ok){
                setError(data.message)
                return
            }
            localStorage.setItem("adminToken", data.data.token);
            navigate("/admin");
            } catch (err) {
                setError("Server unreachable. Try again later.");
            } finally {
                setLoading(false);
            }
        };
    
    return(
        <>
        <div className="login-page">
            <div className = "login-form">
                <h1>Authenticate</h1>
                <label>Admin Email</label>
                <input type="text" className="userid" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" className="password" value={password} placeholder="Enter Your Password" onChange={e => setPassword(e.target.value)} />
                {error && <p className="error-message">{error}</p>}
                <button className="authenticate-button" onClick={() => authenticateService(email, password)} disabled={loading}>
                    {loading ? "Authenticating..." : "Login"}
                </button>        
            </div>
        </div>
        </>
    )
}

export default Login;