"use server";
import { cookies } from "next/headers";

export const logout = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieStore.get("refresh_token")?.value}`,
        },
        credentials: "include",
      }
    );

    cookieStore.set("access_token", "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
    });

    cookieStore.set("refresh_token", "", {
      expires: new Date(0),
      path: "/",
      httpOnly: true,
    });

    return res.ok;
  } catch (error) {
    console.error(`Failed to logout: ${error}`);
    return false;
  }
};
