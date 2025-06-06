import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth } from "@/lib/firebaseAdmin";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Firebase",
      credentials: {
        token: { label: "Firebase ID Token", type: "text" },
      },
      async authorize(credentials) {
        const idToken = credentials?.token;
        if (!idToken) return null;

        try {
          const decodedToken = await adminAuth.verifyIdToken(idToken);
          const userRecord = await adminAuth.getUser(decodedToken.uid);

          return {
            id: userRecord.uid,
            email: userRecord.email || "",
            name: userRecord.displayName || "",
          };
        } catch (err) {
          console.error("Firebase token verification failed", err);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) session.user.uid = token.uid;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
