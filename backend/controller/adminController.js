import { getAllPersonService, deletePersonService, updatePersonService, addPersonService } from "../models/adminModel"
import { toDescriptors } from "../middleware/facetodescriptors"

const handleResponse = (res,status,message,data = null) =>{
    res.status(status).json({
        status,
        message,
        data
    })
}

export const getAllPerson= async(req, res, next)=>{
    const result = await getAllPersonService();
    handleResponse(res,200,"Displaying All users",result)
}

export const addPerson= async(req, res, next)=>{
    const{name,photo} = req.body;
    const descriptors= await toDescriptors(photo);
    const result = await addPersonervice();
    handleResponse(res,200,"Displaying All users",result)
}

export const deletePerson= async(req, res, next)=>{

    const result = await deletePersonService(req.params.id);
    handleResponse(res,200,"Displaying All users",result)
}

export const updatePerson= async(req, res, next)=>{
    const {name,photo}= req.body;
    const descriptors = await toDescriptors(photo);
    const result = await updatePersonService(name,descriptors,req.params.id);
    handleResponse(res,200,"Displaying All users",result)
}