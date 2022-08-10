import { v4 as uuidv4 } from "uuid";
import { ICategory } from "./../Interfaces/category.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";
import data from "./../db";

export const getAllCategories = (tenantId: any) => {
  if (tenantId && typeof tenantId == "string") {
    const categories: ICategory[] | undefined = data.categories.filter(
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
};

export const getCategoryById = (tenantId: any, id: string) => {
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

export const deleteCategoryById = (tenantId: any, id: string) => {
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

export const addCategory = (category: any) => {
  if (category) {
    const { name, tenantId } = category;
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
