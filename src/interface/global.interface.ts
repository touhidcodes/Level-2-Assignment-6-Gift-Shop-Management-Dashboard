export const userRoles = {
  manager: "manager",
  seller: "seller",
};

export type TJWTPayload = { username: string; role: string };
