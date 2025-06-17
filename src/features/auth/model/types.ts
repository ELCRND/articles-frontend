export interface IUser {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  role?: "USER" | "EDITOR" | "ADMIN";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
