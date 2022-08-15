import express, { Request, Response } from "express";
import TenantsController from "./../controllers/tenants.controller";

const tenantsRouter = express.Router();
const tenantController = new TenantsController();

tenantsRouter.get("/", (req: Request, res: Response) => {
  const { status, response } = tenantController.getAllTenants();
  return res.status(status).send(response);
});
tenantsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = tenantController.getTenantById(id);
  return res.status(status).send(response);
});
tenantsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = tenantController.deleteTenantById(id);
  return res.status(status).send(response);
});

tenantsRouter.post("/", (req: Request, res: Response) => {
  const { tenant } = req.body;
  const { status, response } = tenantController.addTenant(tenant);
  return res.status(status).send(response);
});

export default tenantsRouter;
