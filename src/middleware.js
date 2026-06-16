import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    const pathname =
      req.nextUrl.pathname;

    if (!token) {
      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }

    // ADMIN

    if (
      pathname.startsWith(
        "/admin"
      ) &&
      token.role !== "admin"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    // PATIENT

    if (
      pathname.startsWith(
        "/patient"
      ) &&
      token.role !== "patient"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    // COUNSELOR

    if (
      pathname.startsWith(
        "/counselor"
      ) &&
      token.role !==
        "counselor"
    ) {
      return NextResponse.redirect(
        new URL("/", req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({
        token,
      }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/patient/:path*",
    "/counselor/:path*",
    "/admin/:path*",
  ],
};