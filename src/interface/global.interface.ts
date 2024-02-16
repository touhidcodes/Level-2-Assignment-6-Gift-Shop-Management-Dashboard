export const userRoles = {
  superAdmin: "superAdmin",
  admin: "admin",
  manager: "manager",
  seller: "seller",
} as const;

export type TUserRole = keyof typeof userRoles;

export type TJWTPayload = { username: string; role: TUserRole };
