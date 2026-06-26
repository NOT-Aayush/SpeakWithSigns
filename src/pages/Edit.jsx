import { useState } from "react";
import { authFetch } from "../utils/authFetch.js";
import "../css/Edit.css"
const Edit = ()=>{
    const [action,setAction] = useState("");
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [image,setImage] = useState("");

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = ()=>{
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async () => {
        const data = {
            name,
            photo: image
        };
        console.log(image.length);
        try {
            let response;
            let result;

            switch (action) {
                case "add":
                    response = await authFetch("https://speakwithsigns.onrender.com/admin/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    result = await response.json();
                    

                    break;

                case "update":
                    response = await authFetch(`https://speakwithsigns.onrender.com/admin/update/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    result = await response.json();

                    break;

                case "delete":
                    response = await authFetch(`https://speakwithsigns.onrender.com/admin/delete/${id}`, {
                        method: "DELETE"
                    });
                    result = await response.json();

                    break;

                default:
                    return alert("Select an action");
            }

            console.log(result);
            alert(result.message);

            setId("");
            setName("");
            setImage("");
            setAction("");

        } catch (err) {
            console.error(err);
        }
    };
        return(
        <>
        <div className="make-changes">
            <h1>Make Changes in Database</h1>
            <select value={action} onChange={(e)=>setAction(e.target.value)}>
                <option value="">Select Action</option>
                <option value="add">Add</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
            </select>

            {action !== "add" && action !== "" && (
                <>
                    <label>ID</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e)=>setId(e.target.value)}
                    />
                </>
            )}

            {action !== "delete" && action !== "" && (
                <>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </>
            )}
            {image && (
                <img
                    src={image}
                    alt="preview"
                    width="200"
                />
            )}
            {action && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <button type="submit">
                        Submit
                    </button>
                </form>
            )}
        </div>
        </>
    )
}

export default Edit;