import express, { Request, Response } from "express";
import CategoriesController from "./../controllers/categories.controller";

const categoriesRouter = express.Router();
const categoriesController = new CategoriesController();

categoriesRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = categoriesController.getAllCategories(tenantId);
  return res.status(status).send(response);
});
categoriesRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = categoriesController.getCategoryById(
    tenantId,
    id
  );
  return res.status(status).send(response);
});
categoriesRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = categoriesController.deleteCategoryById(
    tenantId,
    id
  );
  return res.status(status).send(response);
});

categoriesRouter.post("/", (req: Request, res: Response) => {
  const { category } = req.body;
  const { status, response } = categoriesController.addCategory(category);
  return res.status(status).send(response);
});

export default categoriesRouter;
