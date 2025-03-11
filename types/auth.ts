export type LoginPayload = {
  email: string;
  password: string;
};

export type signUpPayload = {
  names: string;
  province: string;
  district: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "donor" | "admin";
};
