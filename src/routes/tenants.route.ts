import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import { v4 as uuidv4 } from "uuid";
import data from "./../db.js";
import { ITenant } from "./../Interfaces/tenant.interface";

const tenantsRouter = express.Router();

tenantsRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send(data.tenants);
});
tenantsRouter.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const tenant: ITenant | undefined = data.tenants.find(
    (tenant) => tenant.id === id
  );
  if (tenant) {
    const response = {
      message: "tenant found",
      data: tenant,
    };
    res.status(200).json(response);
  } else {
    const response = {
      message: "tenant not found",
      data: null,
    };
    res.status(404).json(response);
  }
});
tenantsRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const tenantCheck: ITenant | undefined = data.tenants.find(
    (tenant) => tenant.id === id
  );

  if (tenantCheck) {
    const newTenantsList = data.tenants.filter((user) => user?.id !== id);

    writeFile(
      "./src/data/tenants.json",
      JSON.stringify(newTenantsList),
      (err) => {
        if (err) throw err;
      }
    );

    const response = {
      message: "Tenant deleted successfully",
    };

    res.status(200).send(response);
  } else {
    const response = {
      message: "Invalid tenant Id",
    };
    res.status(400).json(response);
  }
});

tenantsRouter.post("/", (req: Request, res: Response) => {
  if (req.body.tenant) {
    const { name, theme } = req.body.tenant;
    if (name) {
      const nameCheck = data.tenants.find((tenant) => tenant.name === name);
      if (!nameCheck) {
        const tenant: ITenant = {
          id: uuidv4(),
          name: name,
          theme: theme ? theme : data.defaultTheme,
        };

        readFile("./dist/data/tenants.json", "utf8", (err, data) => {
          if (err) throw err;
          let allTenants = JSON.parse(data);
          allTenants.push(tenant);

          writeFile(
            "./src/data/tenants.json",
            JSON.stringify(allTenants),
            (err) => {
              if (err) throw err;

              const response = {
                message: "Tenant added successfully",
                data: tenant,
              };

              res.status(201).json(response);
            }
          );
        });
      } else {
        const response = {
          message: "Tenant already registered",
          data: null,
        };

        res.status(409).json(response);
      }
    } else {
      const response = {
        message: "Tenant add Failed",
        data: null,
      };
      res.status(500).json(response);
    }
  } else {
    const response = {
      message: "Invalid request",
      data: null,
    };
    res.status(400).json(response);
  }
});

export default tenantsRouter;
