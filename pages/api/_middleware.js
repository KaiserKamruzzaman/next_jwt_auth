import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req) {
  console.log("api middleware called");
  const { cookies } = req;
  const url = req.nextUrl.clone();
  const secret = process.env.SECRET_TOKEN;
  const jwt = cookies.MyJwtCookie;
  if (!jwt && url.pathname.includes("/api/auth")) {
    return NextResponse.next();
  }
  if (jwt) {
    console.log("api te token paise..");
    try {
      const { payload: jwtData } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );
      return NextResponse.next();
      //console.log(jwtData);
    } catch (error) {
      console.log("some api error paise....");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
