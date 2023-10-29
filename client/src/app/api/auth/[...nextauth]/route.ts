import NextAuth, { Account, AuthOptions, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
console.log('GOOGLE_ID',process.env.GOOGLE_ID)
console.log('GOOGLE_SECRET',process.env.GOOGLE_SECRET)
console.log('NEXTAUTH_URL',process.env.NEXTAUTH_URL)

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID!,
          clientSecret: process.env.GOOGLE_SECRET!
        })
      ],
    callbacks: {
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            return Promise.resolve(url);
        },
        async jwt({ token, user, account, profile }) {
            if (account) {
              token.idToken = account.id_token ?? ''
            }
            return token;
          },
        async session({ session, token, user }: {session: Session, token: JWT, user: User}): Promise<Session>{
            session.user.idToken = token.idToken;
            return session
    }
    }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
