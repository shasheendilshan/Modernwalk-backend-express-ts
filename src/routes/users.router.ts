import express, { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  addUser,
} from "./../controllers/users.controller";

const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = getAllUsers(tenantId);
  return res.status(status).send(response);
});

usersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = getUserById(tenantId, id);
  return res.status(status).send(response);
});
usersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = deleteUserById(tenantId, id);
  return res.status(status).send(response);
});

usersRouter.post("/", (req: Request, res: Response) => {
  const { user } = req.body;
  const { status, response } = addUser(user);
  return res.status(status).send(response);
});

export default usersRouter;
