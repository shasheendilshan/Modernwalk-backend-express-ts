import { v4 as uuidv4 } from "uuid";
import { INewProduct, IProduct } from "./../Interfaces/products.interface";
import { Get, Route, Query, Tags, Delete, Post, Body } from "tsoa";
import { ProductsService } from "./../services/products.service";

@Route("api/v1/products")
@Tags("Products")
export default class ProductsController {
  productService;
  constructor() {
    this.productService = new ProductsService();
  }

  @Get("/")
  public getAllProducts(@Query() tenantId: any) {
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
  }

  @Get("/:id")
  public getProductById(id: string) {
    if (id) {
      const product = this.productService.getProductById(id);
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
  }

  @Delete("/:id")
  public deleteProductById(id: string) {
    if (id) {
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
          message: "Product not found for this product id",
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
  public addProduct(@Body() product: INewProduct) {
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
  }
}
