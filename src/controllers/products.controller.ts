import { v4 as uuidv4 } from "uuid";
import { IProduct } from "./../Interfaces/products.interface";
import data from "./../db";
import { ProductsService } from "./../services/products.service";

export default class ProductsController {
  productData;
  productService;

  constructor() {
    this.productData = data.products;
    this.productService = new ProductsService(this.productData);
  }

  public getAllProducts = (tenantId: any) => {
    if (tenantId && typeof tenantId == "string") {
      const products = this.productService.getAllProducts(tenantId);
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

  public getProductById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const product = this.productService.getProductByIdForTenant(id, tenantId);
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

  public deleteProductById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const product = this.productService.getProductById(id);
      if (product) {
        this.productService.deleteProductById(id);
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

  public addProduct = (product: any) => {
    if (product) {
      const { tenantId, title, price, description, category, image, rating } =
        product;
      if (tenantId && title && price && description && category && image) {
        const productCheck = this.productService.checkProductExist(
          title,
          tenantId
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

          this.productService.addProduct(product);

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
}
