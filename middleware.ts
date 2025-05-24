import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Get cookie, fallback for different envs
    const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

    // If no token, redirect to login
    if (!token) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    // TODO: Optionally verify token here (see step 3)

    // Allow request to continue if token exists
    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/users/:path*'], // protected routes here
};
