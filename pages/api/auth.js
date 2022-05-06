import prisma from "../../lib/prisma";
import ApiResponse from "../../lib/ApiResponse";
import jsonwebtoken from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
const secret = process.env.SECRET_TOKEN;

export default async function handler(req, res) {
  const data = req.body.formData;
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (user) {
    console.log("user-found");
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: user.email,
        name: user.name,
      },
      secret
    );
    //console.log(token);
    const serialised = serialize("MyJwtCookie", token, {
      httpOnly: true,
      maxAge: 3600,
      sameSite: "strict",
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    //console.log(token);
    return ApiResponse(res, { data: user }, 200);
  } else {
    return ApiResponse(res, null, 403);
  }
}
