import express, { Request, Response } from "express";
import data from './../db.js';

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
  res.send(data.users);
});

usersRouter.post("/",(req: Request, res: Response) => {
  
})


export default usersRouter;
