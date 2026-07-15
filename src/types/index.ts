import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}

export type ActionResponse<T = undefined> = {
  success: boolean;
  message?: string;
  data?: T;
};
