import { userService } from "@/entities/user/api/user.service";
import { authService } from "@/features/auth/api/auth.service";
import Auth from "@/widgets/auth/ui/Auth/Auth";
import { cookies } from "next/headers";
import React from "react";

const AuthPage = async () => {
  // const cookieStore = await cookies();
  // console.log(cookieStore.get("access_token")?.value);
  // const accessToken = cookieStore.get("access_token")?.value;

  // const refreshToken = cookieStore.get("refresh_token")?.value;

  // if (accessToken) {
  //   const user = await userService.getMe(accessToken);
  //   console.log(user);
  // } else if (refreshToken) {
  // const a = await authService.refreshTokens(refreshToken);
  // console.log(a);
  // }

  return (
    <>
      <Auth />
    </>
  );
};

export default AuthPage;
