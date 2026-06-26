import { useEffect, useState } from "react";
import { authFetch } from "../utils/authFetch.js";
import { useNavigate } from "react-router-dom";
import UsersData from "../components/UsersData.jsx";
import "../css/Admin.css";
function Admin(){
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [persons, setPersons] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const getTable = async () => {
        setError("");
        setLoading(true);
        try{
            const response = await authFetch(`${API_URL}/admin/all`, {
                method: "GET"
            })
            const data = await response.json();
            console.log(data);
            if (!response.ok){
                setError(data.message)
                return
            }
            setPersons(data.data);

        }catch(err){
            setError("Server unreachable. Try again later.");

        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getTable();
    },[])

    const edit = ()=>{
        navigate("/edit");
    }
    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return(
        <>
        <div className="Admin-main">
            <h1>Welcome Admin</h1>
            <div className="controls">
                <button className="load-person" onClick={getTable}>Reload </button>
                <button className="edit-person" onClick={edit}>edit</button>
                <button clasName="logout" onClick={logout}>Logout</button>
            </div>
            <div className="database">
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                <table className="persons-table">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Face Descriptors</th>
                        <th>Creation Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UsersData persons= {persons} />
                    </tbody>
                </table>

            </div>
        </div>
        </>
    )
}

export default Admin;