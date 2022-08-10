import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import data from "./../db.js";
import { ICategory } from "./../Interfaces/category.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";

const categoriesRouter = express.Router();

categoriesRouter.get("/", (req: Request, res: Response) => {
  const { tenantId } = req.query;
  if (tenantId) {
    const categories: ICategory[] | undefined = data.categories.filter(
      (category: ICategory) => category.tenantId === tenantId
    );
    if (categories.length > 0) {
      const response = {
        message: "all categories for this tenant",
        data: categories,
      };
      res.status(200).send(response);
    } else {
      const response = {
        message: "no categories for this tenant",
      };
      res.status(404).send(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});
categoriesRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;

  if (id && tenantId) {
    const category: ICategory | undefined = data.categories.find(
      (category: ICategory) =>
        category.id === id && category.tenantId === tenantId
    );
    if (category) {
      const response = {
        message: "category found",
        data: category,
      };
      res.status(200).json(response);
    } else {
      const response = {
        message: "category not found",
        data: null,
      };
      res.status(404).json(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});
categoriesRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { tenantId } = req.query;

  if (id && tenantId) {
    const category: ICategory | undefined = data.categories.find(
      (category: ICategory) =>
        category.id === id && category.tenantId === tenantId
    );
    if (category) {
      const newCategoryList: ICategory[] | undefined = data.categories.filter(
        (category: ICategory) =>
          category.id !== id && category.tenantId === tenantId
      );

      fileWriter("./src/data/categories.json", newCategoryList);

      const response = {
        message: "Category deleted successfully",
      };

      res.status(201).json(response);
    } else {
      const response = {
        message: "category not found for tenant id or category id",
        data: null,
      };
      res.status(404).json(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});
categoriesRouter.post("/", (req: Request, res: Response) => {
  if (req.body.category) {
    const { name, tenantId } = req.body.category;
    if (name && tenantId) {
      const categoryCheck = data.categories?.find(
        (category: ICategory) =>
          category.name === name && category.tenantId === tenantId
      );

      if (!categoryCheck) {
        const category: ICategory = {
          id: uuidv4(),
          name: name,
          tenantId: tenantId,
        };

        let allCategories: ICategory[] = data.categories;

        allCategories.push(category);

        fileWriter("./src/data/categories.json", allCategories);

        const response = {
          message: "Tenant added successfully",
          data: category,
        };

        res.status(201).json(response);
      } else {
        const response = {
          message: "Category already added",
          data: null,
        };

        res.status(409).json(response);
      }
    } else {
      const response = {
        message: "Category add Failed",
        data: null,
      };
      res.status(500).json(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});
export default categoriesRouter;
