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
    const queryText2 = `
    CREATE TABLE IF NOT EXISTS appearance_logs (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES persons(id),
        detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        confidence FLOAT
    )
    `;
    
    try{
        await pool.query(queryText1);
        console.log("persons table created if not existed ");
        await pool.query(queryText2);
        console.log("logs table created if not existed ");
    }catch(error){
        console.log("Error creating table", error);

    }
};

export default createUserTable;