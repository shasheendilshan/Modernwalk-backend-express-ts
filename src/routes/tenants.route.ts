import express, { Request, Response } from "express";
import {
  getAllTenants,
  getTenantById,
  deleteTenantById,
  addTenant,
} from "./../controllers/tenants.controller";

const tenantsRouter = express.Router();

tenantsRouter.get("/", (req: Request, res: Response) => {
  const { status, response } = getAllTenants();
  return res.status(status).send(response);
});
tenantsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = getTenantById(id);
  return res.status(status).send(response);
});
tenantsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = deleteTenantById(id);
  return res.status(status).send(response);
});

tenantsRouter.post("/", (req: Request, res: Response) => {
  const { tenant } = req.body;
  const { status, response } = addTenant(tenant);
  return res.status(status).send(response);
});

export default tenantsRouter;
