import prisma from "../../lib/prisma";
import ApiResponse from "../../lib/ApiResponse";

export default async function handler(req, res) {
  const data = req.body.formData;
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return ApiResponse(res, { data: newUser }, 200);
}
