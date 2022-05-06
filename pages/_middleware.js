import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
export async function middleware(req, ev) {
  console.log("middleware called...");
  const { cookies } = req;
  const secret = process.env.SECRET_TOKEN;
  const jwt = cookies.MyJwtCookie;
  console.log(jwt);
  const url = req.nextUrl.clone();
  console.log(jwt);
  // if (!jwt && url.pathname.includes("/")) {
  //   return NextResponse.next();
  // }
  // if (!jwt && !url.pathname.includes("/login")) {
  //   console.log("paynai..");
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
  // if (!jwt && url.pathname.includes("/login")) {
  //   return NextResponse.next();
  // }
  if (jwt && url.pathname !== "/login") {
    console.log("ase ase....");
    try {
      const { payload: jwtData } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );
      console.log(jwtData);
    } catch (error) {
      console.log("some error....");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.includes("/api/auth")) {
    return NextResponse.next();
  }
  if (!jwt && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
