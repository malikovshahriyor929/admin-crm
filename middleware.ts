import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const token = request.cookies.get("token");
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: "/dashboard/:path*",
};
