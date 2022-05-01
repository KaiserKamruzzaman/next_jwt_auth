import prisma from "../../lib/prisma";
import ApiResponse from "../../lib/ApiResponse";
import jsonwebtoken from "jsonwebtoken";

export default async function handler(req, res) {
  const { cookies } = req;

  console.log(cookies);
  console.log(req.headers);
  res.setHeader("Set-Cookie", "serialised");
  return ApiResponse(res, "hello", 200);
}
