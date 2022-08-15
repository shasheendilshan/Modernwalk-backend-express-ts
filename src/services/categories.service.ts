import { ICategory } from "./../Interfaces/category.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";

export class CategoriesService {
  dataSource: ICategory[];

  constructor(dataSource: ICategory[]) {
    this.dataSource = dataSource;
  }

  getAllCategories(tenantId: string): ICategory[] {
    return this.dataSource.filter(
      (category: ICategory) => category.tenantId === tenantId
    );
  }

  getCategoryById(id: string) {
    return this.dataSource.find((category: ICategory) => category.id === id);
  }
  getCategoryByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (category: ICategory) =>
        category.id === id && category.tenantId === tenantId
    );
  }

  deleteCategoryById(id: string) {
    const newCategoryList = this.dataSource.filter(
      (category: ICategory) => category.id !== id
    );
    fileWriter("./src/data/categories.json", newCategoryList);
  }
  addCategory(category: ICategory) {
    let allCategories: ICategory[] = this.dataSource;
    allCategories.push(category);
    fileWriter("./src/data/categories.json", allCategories);
  }
  checkCategoryExist(name: string, tenantId: string) {
    return this.dataSource.find(
      (category: ICategory) =>
        category.name === name && category.tenantId === tenantId
    );
  }
}
