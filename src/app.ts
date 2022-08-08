import express, { Request, Response } from "express";
import categoriesRouter from "./routes/categories.route";
import productsRouter from "./routes/products.route";
import tenantsRouter from "./routes/tenants.route";
import usersRouter from "./routes/users.router";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Modernwalk API");
});

app.use("api/v1/categories", categoriesRouter);
app.use("api/v1/products", productsRouter);
app.use("api/v1/tenants", tenantsRouter);
app.use("api/v1/users", usersRouter);

export default app;
