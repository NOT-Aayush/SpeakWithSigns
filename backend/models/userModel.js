import pool from "../config/db.js";

export const getFaceService = async () =>{
    const result = await pool.query("SELECT * FROM persons");
    return result.rows;
}
