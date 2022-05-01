import prisma from "../../lib/prisma";
import ApiResponse from "../../lib/ApiResponse";
import jsonwebtoken from "jsonwebtoken";

export default async function handler(req, res) {
  const data = req.body.formData;
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
      password: data.password,
    },
  });
  if (user) {
    console.log(user);
    return ApiResponse(res, { data: user }, 200);
  } else {
    return ApiResponse(res, null, 403);
  }
}
