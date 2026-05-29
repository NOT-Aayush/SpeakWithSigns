import pool from '../config/db.js'

const createUserTable = async () => {
    const queryText1 = `
    CREATE TABLE IF NOT EXISTS persons(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    face_descriptor JSONB NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `;
    
    try{
        await pool.query(queryText1);
        console.log("persons table created if not existed ");

    }catch(error){
        console.log("Error creating table", error);

    }
};

export default createUserTable;