import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && !request.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  if (token && request.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/recharge', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/transfer', '/recharge', '/withdrawal', '/historic', '/auth/login', '/auth/register'],
};
