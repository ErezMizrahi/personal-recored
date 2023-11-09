import NextAuth, { Account, AuthOptions, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  })


async function refreshAccessToken(token: any) {
  try {
    const url = "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_ID!,
        client_secret: process.env.GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

      // console.log(url)

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()
    // console.log('json')
    // console.log(refreshedTokens)
    // console.log('json')

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID!,
          clientSecret: process.env.GOOGLE_SECRET!,
          authorization: GOOGLE_AUTHORIZATION_URL,
        })
      ],
    callbacks: {
        async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
            return Promise.resolve(url);
        },
          async jwt({token, user, account}) {
            // Initial sign in
            if (account && user) {
              // console.log(account);
                token.idToken = account.id_token ?? '';
                token.accessToken = account.access_token ?? '';
                token.accessTokenExpires = Date.now() + account.expires_at!;
                token.refreshToken = account.refresh_token ?? '';
                token.user = user;

                return token;
            }
      
            console.log(new Date(Date.now()), new Date(token.accessTokenExpires))

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires ) {
              return token
            }
      
            // Access token has expired, try to update it
            const tok = await refreshAccessToken(token);
            console.log('tok', tok);
            return tok;
          },
          async session({session, token}) {
            if (token) {
              session.user.idToken = token.idToken;
            }
      
            return session
          },
      }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
