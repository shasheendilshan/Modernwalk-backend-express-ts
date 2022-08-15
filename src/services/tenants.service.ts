import { ITenant } from "./../Interfaces/tenant.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";

export class TenantsService {
  dataSource: ITenant[];

  constructor(dataSource: ITenant[]) {
    this.dataSource = dataSource;
  }

  getAllTenants() {
    return this.dataSource;
  }

  getTenantById(id: string) {
    return this.dataSource.find((tenant: ITenant) => tenant.id == id);
  }

  deleteTenantById(id: string) {
    const newTenantsList = this.dataSource.filter(
      (tenant: ITenant) => tenant.id !== id
    );
    fileWriter("./src/data/tenants.json", newTenantsList);
  }
  addTenant(tenant: ITenant) {
    let allTenants = this.dataSource;
    allTenants.push(tenant);
    fileWriter("./src/data/tenants.json", allTenants);
  }
  checkTenantExist(name: string) {
    return this.dataSource.find((tenant) => tenant.name === name);
  }
}
