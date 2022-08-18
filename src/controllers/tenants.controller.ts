import { v4 as uuidv4 } from "uuid";
import { Get, Route, Tags, Delete, Post, Body, Example } from "tsoa";
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
  @Example<string>("aa571939-2c90-4e39-ba08-d16eecfb962e")
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

  @Example<any>({
    tenant: {
      name: "asd",
      theme: {
        primary: "#D782BA",
        secondary: "#EEB1D5",
        btn_primary_normal: "#E18AD4",
        btn_primary_hover: "#D782BA",
        btn_primary_active: "#B879A3",
        btn_primary_disabled: "#f3d1ee",
        btn_outlined_hover: "#f3d1ee",
        btn_outlined_active: "#d1b3c4",
        btn_outlined_disabled: "#ffffff",
        btn_danger_normal: "#E1273D",
        btn_danger_hover: "#C01227",
        btn_danger_active: "#9D0215",
        btn_danger_outlined_hover: "#F9D4D8",
        btn_danger_outlined_active: "#F0939E",
        text_main: "#4E1D3D",
        text_active: "#8E5B7D",
        text_inactive: "#C6CBD5",
        elephant_gray: "#F7F8F9",
        elephant_contrast: "#F0F2F5",
        error: "#FF5A43",
      },
    },
  })
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
