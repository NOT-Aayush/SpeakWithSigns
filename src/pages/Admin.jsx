function Admin(){
    return(
        <>
        <div className="Admin-main">
            <h1>Welcome Admin</h1>
            <div className="controls">
                <button className="add-person">add Person </button>
                
                <button className="delete-person">edlete person</button>
                <button className="update-person">update record</button>             
            </div>
        </div>
        </>
    )
}

export default Admin;