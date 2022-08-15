import { v4 as uuidv4 } from "uuid";
import { ITenant } from "./../Interfaces/tenant.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";
import data from "./../db";

export default class TenantsController {
  tenantsData;

  constructor() {
    this.tenantsData = data.tenants;
  }

  public getAllTenants = () => {
    return {
      response: this.tenantsData,
      status: 200,
    };
  };

  public getTenantById = (id: any) => {
    const tenant: ITenant | undefined = this.tenantsData.find(
      (tenant) => tenant.id === id
    );
    if (tenant) {
      const response = {
        message: "tenant found",
        data: tenant,
      };
      return {
        response: response,
        status: 200,
      };
    } else {
      const response = {
        message: "tenant not found",
        data: null,
      };
      return {
        response: response,
        status: 404,
      };
    }
  };

  public deleteTenantById = (id: any) => {
    const tenant: ITenant | undefined = this.tenantsData.find(
      (tenant) => tenant.id === id
    );
    if (tenant) {
      const newTenantsList = this.tenantsData.filter((user) => user?.id !== id);

      fileWriter("./src/data/tenants.json", newTenantsList);

      const response = {
        message: "Tenant deleted successfully",
      };

      return {
        response: response,
        status: 201,
      };
    } else {
      const response = {
        message: "Invalid tenant Id",
      };
      return {
        response: response,
        status: 400,
      };
    }
  };

  public addTenant = (tenant: any) => {
    if (tenant) {
      const { name, theme } = tenant;
      if (name) {
        const nameCheck = this.tenantsData.find(
          (tenant) => tenant.name === name
        );
        if (!nameCheck) {
          const tenant: ITenant = {
            id: uuidv4(),
            name: name,
            theme: theme ? theme : data.defaultTheme,
          };
          let allTenants: ITenant[] = this.tenantsData;

          allTenants.push(tenant);

          fileWriter("./src/data/tenants.json", allTenants);
          const response = {
            message: "Tenant added successfully",
            data: tenant,
          };

          return {
            response: response,
            status: 201,
          };
        } else {
          const response = {
            message: "Tenant already registered",
            data: null,
          };

          return {
            response: response,
            status: 409,
          };
        }
      } else {
        const response = {
          message: "Tenant add Failed ",
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
