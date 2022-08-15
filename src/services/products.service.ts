import { IProduct } from "./../Interfaces/products.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";

export class ProductsService {
  dataSource: IProduct[];

  constructor(dataSource: IProduct[]) {
    this.dataSource = dataSource;
  }

  getAllProducts(tenantId: string) {
    return this.dataSource.filter(
      (product: IProduct) => product.tenantId === tenantId
    );
  }

  getProductById(id: string) {
    return this.dataSource.find((product: IProduct) => product.id === id);
  }

  getProductByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (product: IProduct) => product.id === id && product.tenantId === tenantId
    );
  }
  deleteProductById(id: string) {
    const newProductList: IProduct[] = this.dataSource.filter(
      (product: IProduct) => product.id !== id
    );
    fileWriter("./src/data/products.json", newProductList);
  }
  addProduct(product: IProduct) {
    let allProducts: IProduct[] = this.dataSource;
    allProducts.push(product);
    fileWriter("./src/data/products.json", allProducts);
  }
  checkProductExist(title: string, tenantId: string) {
    return this.dataSource.find(
      (product: IProduct) =>
        product.title === title && product.tenantId === tenantId
    );
  }
}
