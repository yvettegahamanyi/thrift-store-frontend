export type LoginPayload = {
  email: string;
  password: string;
};

export type signUpPayload = {
  firstName: string;
  lastName: string;
  province: string;
  district: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
};

export enum Role {
  CUSTOMER = "CUSTOMER",
  DONOR = "DONOR",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  addaddress: string;
  phoneNumber: string;
  createdAt: string;
  status: UserStatus;
};
