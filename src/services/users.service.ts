import { fileWriter } from "./../helpers/JsonChange.helper";
import { IUser } from "./../Interfaces/user.interface";

export class UsersService {
  dataSource: IUser[];

  constructor(dataSource: IUser[]) {
    this.dataSource = dataSource;
  }

  getAllUsers(tenantId: string) {
    return this.dataSource.filter((user: IUser) => user.tenantId === tenantId);
  }

  getUserById(id: string) {
    return this.dataSource.find((user: IUser) => user.id === id);
  }

  getUserByIdForTenant(id: string, tenantId: string) {
    return this.dataSource.find(
      (user: IUser) => user.id === id && user.tenantId === tenantId
    );
  }
  deleteUserById(id: string) {
    const newUserList = this.dataSource.find((user: IUser) => user.id === id);
    fileWriter("./src/data/users.json", newUserList);
  }
  addUser(user: IUser) {
    let allUsers: IUser[] = this.dataSource;
    allUsers.push(user);
    fileWriter("./src/data/users.json", allUsers);
  }
  checkUserExist(email: string, tenantId: string) {
    return this.dataSource.find(
      (user: IUser) => user.email === email && user.tenantId === tenantId
    );
  }
}
