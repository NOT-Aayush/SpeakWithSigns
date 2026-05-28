import express from "express";
import { getFace } from "../controller/userController.js";
const uRouter = express.Router();

uRouter.post("/getface",getFace);

export default uRouter;