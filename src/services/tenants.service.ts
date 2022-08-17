import { ITenant } from "./../Interfaces/tenant.interface";
import { fileWriter, fileReader } from "./../helpers/JsonChange.helper";

export class TenantsService {
  getAllTenants() {
    const tenantData = fileReader("./src/data/tenants.json");
    return tenantData;
  }

  getTenantById(id: string) {
    const tenantData = fileReader("./src/data/tenants.json");
    return tenantData.find((tenant: ITenant) => tenant.id == id);
  }

  deleteTenantById(id: string) {
    const tenantData = fileReader("./src/data/tenants.json");
    const newTenantsList = tenantData.filter(
      (tenant: ITenant) => tenant.id !== id
    );
    fileWriter("./src/data/tenants.json", newTenantsList);
  }
  addTenant(tenant: ITenant) {
    const tenantData = fileReader("./src/data/tenants.json");
    let allTenants = tenantData;
    allTenants.push(tenant);
    fileWriter("./src/data/tenants.json", allTenants);
  }
  checkTenantExist(name: string) {
    const tenantData = fileReader("./src/data/tenants.json");
    return tenantData.find((tenant: ITenant) => tenant.name === name);
  }
}
