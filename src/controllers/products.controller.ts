import { v4 as uuidv4 } from "uuid";
import { IProduct } from "./../Interfaces/products.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";
import data from "./../db";

export const getAllProducts = (tenantId: any) => {
  if (tenantId && typeof tenantId == "string") {
    const products: IProduct[] | undefined = data.products.filter(
      (product: IProduct) => product.tenantId === tenantId
    );
    if (products.length > 0) {
      const response = {
        message: "all products for this tenant",
        data: products,
      };
      return {
        response: response,
        status: 200,
      };
    } else {
      const response = {
        message: "no products for this tenant",
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
export const getProductById = (tenantId: any, id: string) => {
  if (id && tenantId) {
    const product: IProduct | undefined = data.products.find(
      (product: IProduct) => product.id === id && product.tenantId === tenantId
    );
    if (product) {
      const response = {
        message: "product found",
        data: product,
      };

      return {
        response: response,
        status: 200,
      };
    } else {
      const response = {
        message: "product not found",
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
export const deleteProductById = (tenantId: any, id: string) => {
  if (id && tenantId) {
    const product: IProduct | undefined = data.products.find(
      (product: IProduct) => product.id === id && product.tenantId === tenantId
    );
    if (product) {
      const newCategoryList: IProduct[] | undefined = data.products.filter(
        (product: IProduct) =>
          product.id !== id && product.tenantId === tenantId
      );

      fileWriter("./src/data/products.json", newCategoryList);

      const response = {
        message: "Product deleted successfully",
      };

      return {
        response: response,
        status: 201,
      };
    } else {
      const response = {
        message: "Product not found for tenant id or product id",
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
export const addProduct = (product: any) => {
  if (product) {
    const { tenantId, title, price, description, category, image, rating } =
      product;
    if (tenantId && title && price && description && category && image) {
      const productCheck = data.products?.find(
        (product: IProduct) =>
          product.title === title && product.tenantId === tenantId
      );

      if (!productCheck) {
        const product: IProduct = {
          id: uuidv4(),
          tenantId: tenantId,
          title: title,
          price: price,
          description: description,
          category: category,
          image: image,
          rating: rating,
        };

        let allProducts: IProduct[] = data.products;

        allProducts.push(product);

        fileWriter("./src/data/products.json", allProducts);

        const response = {
          message: "Product added successfully",
          data: product,
        };

        return {
          response: response,
          status: 201,
        };
      } else {
        const response = {
          message: "Product already added",
          data: null,
        };

        return {
          response: response,
          status: 409,
        };
      }
    } else {
      const response = {
        message: "Product add Failed",
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
