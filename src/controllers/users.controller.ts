import { v4 as uuidv4 } from "uuid";
import { fileWriter } from "./../helpers/JsonChange.helper";
import { IUser } from "./../Interfaces/user.interface";
import data from "./../db";

export default class UsersController {
  usersData;

  constructor() {
    this.usersData = data.users;
  }

  public getAllUsers = (tenantId: any) => {
    if (tenantId && typeof tenantId == "string") {
      const users: IUser[] | undefined = this.usersData.filter(
        (user: IUser) => user.tenantId === tenantId
      );
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
  };

  public getUserById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const user: IUser | undefined = this.usersData.find(
        (user: IUser) => user.id === id && user.tenantId === tenantId
      );
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
  };

  public deleteUserById = (tenantId: any, id: string) => {
    if (id && tenantId) {
      const user: IUser | undefined = this.usersData.find(
        (user: IUser) => user.id === id && user.tenantId === tenantId
      );
      if (user) {
        const newUserList: IUser[] | undefined = this.usersData.filter(
          (user: IUser) => user.id !== id && user.tenantId === tenantId
        );

        fileWriter("./src/data/users.json", newUserList);

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
  };
  public addUser = (user: any) => {
    if (user) {
      const { firstName, lastName, email, password, tenantId } = user;
      if (tenantId && firstName && lastName && email && password) {
        const emailCheck = this.usersData?.find(
          (user: IUser) => user.email === email && user.tenantId === tenantId
        );

        if (!emailCheck) {
          const user: IUser = {
            id: uuidv4(),
            tenantId: tenantId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          };

          let allUsers: IUser[] = this.usersData;

          allUsers.push(user);

          fileWriter("./src/data/users.json", allUsers);

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
  };
}
