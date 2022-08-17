import { v4 as uuidv4 } from "uuid";
import { Get, Route, Tags, Delete, Post, Body } from "tsoa";
import { INewTenant, ITenant } from "./../Interfaces/tenant.interface";
import data from "./../db";
import { TenantsService } from "./../services/tenants.service";

@Route("api/v1/tenants")
@Tags("Tenants")
export default class TenantsController {
  tenantsService;
  constructor() {
    this.tenantsService = new TenantsService();
  }
  @Get("/")
  public getAllTenants() {
    const tenantsData = this.tenantsService.getAllTenants();

    return {
      response: tenantsData,
      status: 200,
    };
  }
  @Get("/:id")
  public getTenantById(id: any) {
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
  }

  @Delete("/:id")
  public deleteTenantById(id: any) {
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
  }

  @Post()
  public addTenant(@Body() tenant: INewTenant) {
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
  }
}
