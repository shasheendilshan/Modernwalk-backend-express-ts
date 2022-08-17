import { IProduct } from "./../Interfaces/products.interface";
import { fileWriter, fileReader } from "./../helpers/JsonChange.helper";

export class ProductsService {
  getAllProducts(tenantId: string) {
    const productsData = fileReader("./src/data/products.json");
    return productsData.filter(
      (product: IProduct) => product.tenantId === tenantId
    );
  }

  getProductById(id: string) {
    const productsData = fileReader("./src/data/products.json");
    return productsData.find((product: IProduct) => product.id === id);
  }

  getProductByIdForTenant(id: string, tenantId: string) {
    const productsData = fileReader("./src/data/products.json");
    return productsData.find(
      (product: IProduct) => product.id === id && product.tenantId === tenantId
    );
  }
  deleteProductById(id: string) {
    const productsData = fileReader("./src/data/products.json");
    const newProductList: IProduct[] = productsData.filter(
      (product: IProduct) => product.id !== id
    );
    fileWriter("./src/data/products.json", newProductList);
  }
  addProduct(product: IProduct) {
    const productsData = fileReader("./src/data/products.json");
    let allProducts: IProduct[] = productsData;
    allProducts.push(product);
    fileWriter("./src/data/products.json", allProducts);
  }
  checkProductExist(title: string, tenantId: string) {
    const productsData = fileReader("./src/data/products.json");
    return productsData.find(
      (product: IProduct) =>
        product.title === title && product.tenantId === tenantId
    );
  }
}
