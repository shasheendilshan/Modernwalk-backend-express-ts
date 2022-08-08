import express, { Request, Response } from "express";
import data from './../db.js';

const tenantsRouter = express.Router();

tenantsRouter.get("/", (req: Request, res: Response) => {
  res.send(data.tenants);
});

export default tenantsRouter;
