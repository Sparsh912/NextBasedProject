
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/verify') ||
    pathname === '/';

  const isDashboardRoute = pathname.startsWith('/dashboard');

  // 🟢 Authenticated users trying to visit auth pages → redirect to dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 🔴 Unauthenticated users trying to visit protected routes → redirect to sign-in
  if (!token && isDashboardRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}









// import { NextResponse, NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";
// export {default} from 'next-auth/middleware'

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const { pathname } = request.nextUrl;

//   // If user is logged in, restrict them from visiting auth pages
//   if (
//     token &&
//     (pathname.startsWith("/sign-in") ||
//       pathname.startsWith("/sign-up") ||
//       pathname.startsWith("/verify"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // If user is not logged in and tries to visit protected routes, redirect to sign-in
//   if (!token && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // Otherwise, allow the request
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/verify/:path*",
//     "/dashboard/:path*",
//   ],
// };
