import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
export function middleware(req, ev) {
  console.log("middleware called...");
  const { cookies } = req;
  const jwt = cookies.MyJwtCookie;
  const url = req.nextUrl.clone();
  console.log(jwt);
  // if (!jwt && url.pathname.includes("/")) {
  //   return NextResponse.next();
  // }
  if (!jwt && url.pathname.includes("/dashboard")) {
    console.log("paynai..");
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  //   try {
  //     let decode = verify(jwt, secret);
  //   } catch (e) {
  //     console.log("error paise...");
  //   }
  // verify(jwt, secret, (err) => {
  //   if (err) {
  //     console.log("error found...");
  //   } else {
  //     console.log("no errro found...");
  //   }
  // });
  //   const token = verify(jwt, secret);
  //   console.log(token);
  //   if (token) {
  //     console.log("token ase...");
  //     return NextResponse.next();
  //   }
  //   if (token === "undefined") {
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  //   try {
  //     console.log("middleware  found...");
  //     const token = verify(jwt, secret);
  //     url.pathname = "/dashboard";
  //     return NextResponse.redirect(url);
  //   } catch (e) {
  //     console.log("middleware not found...");
  //     url.pathname = "/";
  //     return NextResponse.redirect(url);
  //   }
  //   if (url.pathname.includes("/demo")) {
  //     url.pathname = "/";
  //     console.log("demo found...");
  //     console.log(jwt);
  //     if (jwt === undefined) {
  //       console.log("undefine...");
  //       return NextResponse.redirect(url);
  //     }
  //   }
}
