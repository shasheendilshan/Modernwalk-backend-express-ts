import { v4 as uuidv4 } from "uuid";
import { INewProduct, IProduct } from "./../Interfaces/products.interface";
import { Get, Route, Query, Tags, Delete, Post, Body, Example } from "tsoa";
import { ProductsService } from "./../services/products.service";

@Route("api/v1/products")
@Tags("Products")
export default class ProductsController {
  productService;
  constructor() {
    this.productService = new ProductsService();
  }
  @Example<string>("462d6730-b587-4782-807d-f539277d70cd")
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

  @Example<string>("ed548c03-89b6-49f4-b168-1e360d15a23a")
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
  @Example<any>({
    product: {
      tenantId: "462d6730-b587-4782-807d-f539277d70cd",
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 2000,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 },
    },
  })
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
