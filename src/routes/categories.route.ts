import express, { Request, Response } from "express";
import data from "./../db.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", (req: Request, res: Response) => {
  res.send(data.categories);
});

export default categoriesRouter;
