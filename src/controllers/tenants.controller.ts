import { v4 as uuidv4 } from "uuid";
import { ITenant } from "./../Interfaces/tenant.interface";
import { fileWriter } from "./../helpers/JsonChange.helper";
import data from "./../db";
import { TenantsService } from "./../services/tenants.service";

export default class TenantsController {
  tenantsData: ITenant[];
  tenantsService;

  constructor() {
    this.tenantsData = data.tenants;
    this.tenantsService = new TenantsService(this.tenantsData);
  }

  public getAllTenants = () => {
    const tenantsData = this.tenantsService.getAllTenants();

    return {
      response: tenantsData,
      status: 200,
    };
  };

  public getTenantById = (id: any) => {
    const tenant = this.tenantsService.getTenantById(id);
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
    const tenant = this.tenantsService.getTenantById(id);
    if (tenant) {
      this.tenantsService.deleteTenantById(id);
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
        const nameCheck = this.tenantsService.checkTenantExist(name);
        if (!nameCheck) {
          const tenant: ITenant = {
            id: uuidv4(),
            name: name,
            theme: theme ? theme : data.defaultTheme,
          };

          this.tenantsService.addTenant(tenant);

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
