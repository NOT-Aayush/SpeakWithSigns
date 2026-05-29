import { getAllPersonService, deletePersonService, updatePersonService, addPersonService, getAdminService } from "../models/adminModel"
import { toDescriptors } from "../middleware/facetodescriptors"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//RUN THIS CMD TO CREATE ENCRYPTED PASSWORD AND ADD IN ADMIN TABLE

//node -e "const b = require('bcrypt'); b.hash('your_password_here', 10).then(console.log)"

const handleResponse = (res,status,message,data = null) =>{
    res.status(status).json({
        status,
        message,
        data
    })
}
export const getAdmin= async(req, res, next)=>{
    try{
        const {email,password} = req.body;
        const admin = await getAdminService(email);
        if (!admin) return handleResponse(res,401,"Invalid cerdentials");
        const match = await bcrypt.compare(password,admin.password);
        if (!match) return handleResponse(res,401,"Invalid cerdentials");

        const token = jwt.sign(
            { id:admin.id, email: admin.email},
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        )
        handleResponse(res,200,"Authenticated",{ token });
    } catch (err) {
        next(err);
    }
}

export const getAllPerson= async(req, res, next)=>{
    try{
    const result = await getAllPersonService();
    handleResponse(res,200,"Displaying All users",result)
    } catch (err) {
        next(err);
    }
}

export const addPerson= async(req, res, next)=>{
    try{
    const{name,photo} = req.body;
    const descriptors= await toDescriptors(photo);
    const result = await addPersonService(name, descriptors);
    handleResponse(res,200,"Displaying All users",result)
    } catch (err) {
        next(err);
    }
}

export const deletePerson= async(req, res, next)=>{
    try{
    const result = await deletePersonService(req.params.id);
    handleResponse(res,200,"Displaying All users",result)
    } catch (err) {
        next(err);
    }
}

export const updatePerson= async(req, res, next)=>{
    try{
    const {name,photo}= req.body;
    const descriptors = await toDescriptors(photo);
    const result = await updatePersonService(name,descriptors,req.params.id);
    handleResponse(res,200,"Displaying All users",result)
    } catch (err) {
        next(err);
    }
}