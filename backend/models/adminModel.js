import pool from "../config/db.js";

export const getAdminService = async(email) =>{
    const result = await pool.query("SELECT id,email,password FROM admins WHERE email=$1 ",[email]);
    return result.rows[0];
}
export const getAllPersonService = async () =>{
    const result = await pool.query("SELECT * FROM persons");
    return result.rows;
}
export const deletePersonService = async (id) =>{
    const result = await pool.query("DELETE FROM persons WHERE id=$1 RETURNING *",[id]);
    return result.rows[0];
}

export const updatePersonService = async (name,face_descriptor,id) =>{
    const result = await pool.query("UPDATE persons SET name=$1,face_descriptor=$2 WHERE id=$3 RETURNING *",[name,JSON.stringify(face_descriptor),id]);
    return result.rows[0];
}

export const addPersonService = async (name,face_descriptor) =>{
    const result = await pool.query("INSERT INTO persons(name,face_descriptor) VALUES($1,$2) RETURNING *",[name,JSON.stringify(face_descriptor)]);
    return result.rows[0];
}