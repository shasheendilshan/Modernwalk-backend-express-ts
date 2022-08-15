import express, { Request, Response } from "express";
import UsersController from "./../controllers/users.controller";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = usersController.getAllUsers(tenantId);
  return res.status(status).send(response);
});

usersRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = usersController.getUserById(tenantId, id);
  return res.status(status).send(response);
});
usersRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = usersController.deleteUserById(tenantId, id);
  return res.status(status).send(response);
});

usersRouter.post("/", (req: Request, res: Response) => {
  const { user } = req.body;
  const { status, response } = usersController.addUser(user);
  return res.status(status).send(response);
});

export default usersRouter;
