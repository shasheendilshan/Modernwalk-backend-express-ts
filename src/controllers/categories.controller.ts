import { v4 as uuidv4 } from "uuid";
import { Get, Route, Query, Tags, Delete, Post, Body } from "tsoa";
import { ICategory, INewCategory } from "./../Interfaces/category.interface";
import { CategoriesService } from "../services/categories.service";

@Route("api/v1/categories")
@Tags("Categories")
export default class CategoriesController {
  categoryService;

  constructor() {
    this.categoryService = new CategoriesService();
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
  public getCategoryById(id: string) {
    if (id) {
      const category = this.categoryService.getCategoryById(id);
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
  }

  @Delete("/:id")
  public deleteCategoryById(id: string) {
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
          message: "category not found for this category id",
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
  }

  @Post()
  public addCategory(@Body() category: INewCategory) {
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
  }
}
