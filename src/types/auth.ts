export type Role = "ADMIN" | "PROVIDER" | "CLIENT";

export type JwtMe = {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};