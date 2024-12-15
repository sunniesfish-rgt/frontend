import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATHS = ["/admin/:path*"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = ADMIN_PATHS.some((path) => {
    const pattern = new RegExp(`^${path.replace(/\*/g, ".*")}$`);
    return pattern.test(pathname);
  });

  if (!isAdminPage) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("Authentication");

  if (!authCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
