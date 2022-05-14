import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { serialize } from "cookie";
export async function middleware(req, ev) {
  console.log("middleware called...");
  const { cookies } = req;
  const secret = process.env.SECRET_TOKEN;
  const jwt = cookies.MyJwtCookie;
  const url = req.nextUrl.clone();

  if (url.pathname.includes("/api")) {
    console.log("api called...");
    return NextResponse.next();
  }
  if (!url.pathname.includes("/login")) {
    console.log("ase ase....");
    try {
      const { payload: jwtData } = await jose.jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );
      console.log(jwtData);
      return NextResponse.next();
    } catch (error) {
      console.log("some error....");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.includes("/login")) {
    console.log("login er dike jaitese ...");
    if (jwt) {
      try {
        const { payload: jwtData } = await jose.jwtVerify(
          jwt,
          new TextEncoder().encode(secret)
        );
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      } catch (error) {
        console.log("bhejal login...");

        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
