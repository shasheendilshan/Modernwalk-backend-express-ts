export interface IUser {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface INewUser {
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
