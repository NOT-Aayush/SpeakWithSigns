import express from "express";

const aRouter = express.Router();

aRouter.post("/newFace",newFace);
aRouter.get("/fullLogs",getLogs);
aRouter.get("/database",getDatabase);
aRouter.delete("/removeFace",removeFace);

export default aRouter;