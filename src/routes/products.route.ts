import express, { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  deleteProductById,
  addProduct,
} from "./../controllers/products.controller";

const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = getAllProducts(tenantId);
  return res.status(status).send(response);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = getProductById(tenantId, id);
  return res.status(status).send(response);
});
productsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;
  const { status, response } = deleteProductById(tenantId, id);
  return res.status(status).send(response);
});

productsRouter.post("/", async (req: Request, res: Response) => {
  const { product } = req.body;
  const { status, response } = addProduct(product);
  return res.status(status).send(response);
});

export default productsRouter;
