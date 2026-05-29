import express from "express";
import { addPerson , deletePerson , getAllPerson , updatePerson } from "../controller/adminController";
const aRouter = express.Router();

aRouter.post("/add",addPerson);
aRouter.get("/all",getAllPerson);
aRouter.delete("/delete/:id",deletePerson);
aRouter.put("/update/:id",updatePerson);

export default aRouter;