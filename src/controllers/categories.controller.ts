import { v4 as uuidv4 } from "uuid";
import { Get, Route, Query, Tags } from "tsoa";
import { ICategory } from "./../Interfaces/category.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";
import data from "./../db";

@Route("api/v1/categories")
@Tags("Categories")
export default class CategoriesController {
  categoryData;

  constructor() {
    this.categoryData = data.categories;
  }

  @Get("/")
  public getAllCategories(@Query() tenantId: any) {
    if (tenantId && typeof tenantId == "string") {
      const categories: ICategory[] | undefined = this.categoryData.filter(
        (category: ICategory) => category.tenantId === tenantId
      );
      if (categories.length > 0) {
        const response = {
          message: "all categories for this tenant",
          data: categories,
        };
        return {
          response: response,
          status: 200,
        };
      } else {
        const response = {
          message: "no categories for this tenant",
          data: categories,
        };

        return {
          response: response,
          status: 404,
        };
      }
    } else {
      const response = {
        message: "Invalid request",
        data: null,
      };
      return {
        response: response,
        status: 400,
      };
    }
  }

  @Get("/:id")
  public getCategoryById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const category: ICategory | undefined = this.categoryData.find(
        (category: ICategory) =>
          category.id === id && category.tenantId === tenantId
      );
      if (category) {
        const response = {
          message: "category found",
          data: category,
        };

        return {
          response: response,
          status: 200,
        };
      } else {
        const response = {
          message: "category not found",
          data: null,
        };
        return {
          response: response,
          status: 404,
        };
      }
    } else {
      const response = {
        message: "Invalid request",
        data: null,
      };
      return {
        response: response,
        status: 400,
      };
    }
  };

  public deleteCategoryById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const category: ICategory | undefined = this.categoryData.find(
        (category: ICategory) =>
          category.id === id && category.tenantId === tenantId
      );
      if (category) {
        const newCategoryList: ICategory[] | undefined =
          this.categoryData.filter(
            (category: ICategory) =>
              category.id !== id && category.tenantId === tenantId
          );

        fileWriter("./src/data/categories.json", newCategoryList);

        const response = {
          message: "Category deleted successfully",
        };

        return {
          response: response,
          status: 201,
        };
      } else {
        const response = {
          message: "category not found for tenant id or category id",
          data: null,
        };
        return {
          response: response,
          status: 404,
        };
      }
    } else {
      const response = {
        message: "Invalid request",
        data: null,
      };
      return {
        response: response,
        status: 400,
      };
    }
  };

  public addCategory = (category: ICategory) => {
    if (category) {
      const { name, tenantId } = category;
      if (name && tenantId) {
        const categoryCheck = this.categoryData.find(
          (category: ICategory) =>
            category.name === name && category.tenantId === tenantId
        );

        if (!categoryCheck) {
          const category: ICategory = {
            id: uuidv4(),
            name: name,
            tenantId: tenantId,
          };

          let allCategories: ICategory[] = this.categoryData;

          allCategories.push(category);

          fileWriter("./src/data/categories.json", allCategories);

          const response = {
            message: "Category added successfully",
            data: category,
          };

          return {
            response: response,
            status: 201,
          };
        } else {
          const response = {
            message: "Category already added",
            data: null,
          };

          return {
            response: response,
            status: 409,
          };
        }
      } else {
        const response = {
          message: "Category add Failed",
          data: null,
        };
        return {
          response: response,
          status: 500,
        };
      }
    } else {
      const response = {
        message: "Invalid request",
        data: null,
      };
      return {
        response: response,
        status: 400,
      };
    }
  };
}
