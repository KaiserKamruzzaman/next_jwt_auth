import prisma from "../../lib/prisma";
import ApiResponse from "../../lib/ApiResponse";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req, res) {
  const { cookies } = req;
  const jwt = cookies.MyJwtCookie;
  console.log(jwt);
  if (!jwt) {
    return ApiResponse(res, { data: "not logged in ..." }, 401);
  } else {
    const serialised = serialize("MyJwtCookie", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);

    return ApiResponse(res, { data: "Log out successfully s..." }, 200);
  }
}
