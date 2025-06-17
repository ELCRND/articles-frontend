export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: "USER" | "EDITOR" | "ADMIN";
}
