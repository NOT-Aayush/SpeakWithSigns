import express from "express";
import { addPerson , deletePerson , getAllPerson , updatePerson, getAdmin } from "../controller/adminController";
import verifyToken from "../middleware/verifyToken";
const aRouter = express.Router();

aRouter.post("/auth",getAdmin);
aRouter.post("/add",verifyToken,addPerson);
aRouter.get("/all",verifyToken,getAllPerson);
aRouter.delete("/delete/:id",verifyToken,deletePerson);
aRouter.put("/update/:id",verifyToken,updatePerson);

export default aRouter;