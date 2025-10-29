import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname.startsWith('/dashboard')) {
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
