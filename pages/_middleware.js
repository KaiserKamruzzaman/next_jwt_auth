import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { serialize } from "cookie";
export async function middleware(req, ev) {
  console.log("middleware called...");
  const { cookies } = req;
  const secret = process.env.SECRET_TOKEN;
  const jwt = cookies.MyJwtCookie;
  //console.log(jwt);
  const url = req.nextUrl.clone();
  // if (!jwt && url.pathname === "/login") {
  //   return NextResponse.next();
  // }

  if (url.pathname.includes("/api")) {
    console.log("api called...");
    return NextResponse.next();
  }
  console.log(url.pathname);
  if (jwt && !url.pathname.includes("/login")) {
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
        const serialised = serialize("MyJwtCookie", null, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: -1,
          path: "/",
        });
      }
    } else {
      return NextResponse.next();
    }
  }
  if (!jwt && url.pathname !== "/login") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // if (url.pathname.includes("/api/auth")) {
  //   console.log("api called...");
  //   return NextResponse.next();
  // }

  // if (jwt && url.pathname === "/login") {
  //   url.pathname = "/login";
  //   return NextResponse.redirect(url);
  // }
}
