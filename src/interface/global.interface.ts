export const userRoles = {
  superAdmin: "superAdmin",
  manager: "manager",
  seller: "seller",
} as const;

export type TUserRole = keyof typeof userRoles;

export type TJWTPayload = {
  _id: string;
  username: string;
  role: TUserRole;
  iat: number;
  exp: number;
};
