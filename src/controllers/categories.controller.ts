import { v4 as uuidv4 } from "uuid";
import { Get, Route, Query, Tags } from "tsoa";
import { ICategory } from "./../Interfaces/category.interface";
import data from "./../db";
import { CategoriesService } from "../services/categories.service";

@Route("api/v1/categories")
@Tags("Categories")
export default class CategoriesController {
  categoryData;
  categoryService;

  constructor() {
    this.categoryData = data.categories;
    this.categoryService = new CategoriesService(this.categoryData);
  }

  @Get("/")
  public getAllCategories(@Query() tenantId: any) {
    if (tenantId && typeof tenantId == "string") {
      const categories = this.categoryService.getAllCategories(tenantId);
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
      const category = this.categoryService.getCategoryByIdForTenant(
        id,
        tenantId
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

  public deleteCategoryById = (id: string) => {
    if (id) {
      const category = this.categoryService.getCategoryById(id);
      if (category) {
        this.categoryService.deleteCategoryById(id);

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
        const categoryCheck = this.categoryService.checkCategoryExist(
          name,
          tenantId
        );
        if (!categoryCheck) {
          const category: ICategory = {
            id: uuidv4(),
            name: name,
            tenantId: tenantId,
          };

          this.categoryService.addCategory(category);

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
