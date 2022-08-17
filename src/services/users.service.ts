import { fileWriter, fileReader } from "./../helpers/JsonChange.helper";
import { IUser } from "./../Interfaces/user.interface";

export class UsersService {
  getAllUsers(tenantId: string) {
    const userData = fileReader("./src/data/users.json");
    return userData.filter((user: IUser) => user.tenantId === tenantId);
  }

  getUserById(id: string) {
    const userData = fileReader("./src/data/users.json");
    return userData.find((user: IUser) => user.id === id);
  }

  getUserByIdForTenant(id: string, tenantId: string) {
    const userData = fileReader("./src/data/users.json");
    return userData.find(
      (user: IUser) => user.id === id && user.tenantId === tenantId
    );
  }

  deleteUserById(id: string) {
    const userData = fileReader("./src/data/users.json");
    const newUserList = userData.filter((user: IUser) => user.id != id);
    fileWriter("./src/data/users.json", newUserList);
  }

  addUser(user: IUser) {
    let allUsers = fileReader("./src/data/users.json");
    allUsers.push(user);
    fileWriter("./src/data/users.json", allUsers);
  }
  checkUserExist(email: string, tenantId: string) {
    const userData = fileReader("./src/data/users.json");
    return userData.find(
      (user: IUser) => user.email === email && user.tenantId === tenantId
    );
  }
}
