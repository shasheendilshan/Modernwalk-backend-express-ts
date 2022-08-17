import { v4 as uuidv4 } from "uuid";
import { Get, Route, Query, Tags, Delete, Post, Body, Put } from "tsoa";
import { INewUser, IUser } from "./../Interfaces/user.interface";
import { UsersService } from "./../services/users.service";

@Route("api/v1/users")
@Tags("Users")
export default class UsersController {
  usersService;

  constructor() {
    this.usersService = new UsersService();
  }
  @Get("/")
  public getAllUsers(@Query() tenantId: any) {
    if (tenantId && typeof tenantId == "string") {
      const users = this.usersService.getAllUsers(tenantId);
      if (users.length > 0) {
        const response = {
          message: "all users for this tenant",
          data: users,
        };
        return {
          response: response,
          status: 200,
        };
      } else {
        const response = {
          message: "no users for this tenant id",
          data: users,
        };

        return {
          response: response,
          status: 404,
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
  @Get("/:id")
  public getUserById(id: string) {
    if (id) {
      const user = this.usersService.getUserById(id);
      if (user) {
        const response = {
          message: "user found",
          data: user,
        };

        return {
          response: response,
          status: 200,
        };
      } else {
        const response = {
          message: "user not found",
          data: null,
        };
        return {
          response: response,
          status: 404,
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
  @Delete("/:id")
  public deleteUserById(id: string) {
    if (id) {
      const user = this.usersService.getUserById(id);
      if (user) {
        this.usersService.deleteUserById(id);
        const response = {
          message: "User deleted successfully",
        };

        return {
          response: response,
          status: 201,
        };
      } else {
        const response = {
          message: "user not found for tenant id or user id",
          data: null,
        };
        return {
          response: response,
          status: 404,
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

  @Post()
  public addUser(@Body() user: INewUser) {
    if (user) {
      const { firstName, lastName, email, password, tenantId } = user;
      if (tenantId && firstName && lastName && email && password) {
        const emailCheck = this.usersService.checkUserExist(email, tenantId);

        if (!emailCheck) {
          const user: IUser = {
            id: uuidv4(),
            tenantId: tenantId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          };

          this.usersService.addUser(user);

          const response = {
            message: "user added successfully",
            data: user,
          };

          return {
            response: response,
            status: 201,
          };
        } else {
          const response = {
            message: "user already added",
            data: null,
          };

          return {
            response: response,
            status: 409,
          };
        }
      } else {
        const response = {
          message: "user add Failed",
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
