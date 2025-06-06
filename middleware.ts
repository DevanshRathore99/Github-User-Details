import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/login',  // redirect unauthenticated users here
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ['/users/:path*', '/api/github/:path*'], // protected routes here
};
