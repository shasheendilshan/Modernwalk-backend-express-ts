import express, { Request, Response } from "express";
import ProductsController from "./../controllers/products.controller";

ProductsController;

const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  const { status, response } = productsController.getAllProducts(tenantId);
  return res.status(status).send(response);
});

productsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = productsController.getProductById(id);
  return res.status(status).send(response);
});
productsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, response } = productsController.deleteProductById(id);
  return res.status(status).send(response);
});

productsRouter.post("/", async (req: Request, res: Response) => {
  const { product } = req.body;
  const { status, response } = productsController.addProduct(product);
  return res.status(status).send(response);
});

export default productsRouter;
