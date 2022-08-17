import { ICategory } from "./../Interfaces/category.interface";
import { fileWriter, fileReader } from "./../helpers/JsonChange.helper";

export class CategoriesService {
  getAllCategories(tenantId: string): ICategory[] {
    const categoryData = fileReader("./src/data/categories.json");
    return categoryData.filter(
      (category: ICategory) => category.tenantId === tenantId
    );
  }

  getCategoryById(id: string) {
    const categoryData = fileReader("./src/data/categories.json");
    return categoryData.find((category: ICategory) => category.id === id);
  }
  getCategoryByIdForTenant(id: string, tenantId: string) {
    const categoryData = fileReader("./src/data/categories.json");
    return categoryData.find(
      (category: ICategory) =>
        category.id === id && category.tenantId === tenantId
    );
  }

  deleteCategoryById(id: string) {
    const categoryData = fileReader("./src/data/categories.json");
    const newCategoryList = categoryData.filter(
      (category: ICategory) => category.id !== id
    );
    fileWriter("./src/data/categories.json", newCategoryList);
  }
  addCategory(category: ICategory) {
    const categoryData = fileReader("./src/data/categories.json");
    let allCategories: ICategory[] = categoryData;
    allCategories.push(category);
    fileWriter("./src/data/categories.json", allCategories);
  }
  checkCategoryExist(name: string, tenantId: string) {
    const categoryData = fileReader("./src/data/categories.json");
    return categoryData.find(
      (category: ICategory) =>
        category.name === name && category.tenantId === tenantId
    );
  }
}
