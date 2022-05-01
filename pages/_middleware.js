import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export function middleware(req, ev) {
  console.log("middleware called...");
  const { cookies } = req;

  const jwt = cookies.MyJwtCookie;
  const url = req.nextUrl.clone();
  console.log(url);

  if (url.pathname.includes("/demo")) {
    url.pathname = "/";
    console.log("demo found...");
    console.log(jwt);
    if (jwt === undefined) {
      console.log("undefine...");
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
