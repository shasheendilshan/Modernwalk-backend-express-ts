import express, { Request, Response } from "express";
import {
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  addCategory,
} from "./../controllers/categories.controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = getAllCategories(tenantId);
  return res.status(status).send(response);
});
categoriesRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = getCategoryById(tenantId, id);
  return res.status(status).send(response);
});
categoriesRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = deleteCategoryById(tenantId, id);
  return res.status(status).send(response);
});

categoriesRouter.post("/", (req: Request, res: Response) => {
  const { category } = req.body;
  const { status, response } = addCategory(category);
  return res.status(status).send(response);
});

export default categoriesRouter;
