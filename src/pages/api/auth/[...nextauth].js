import NextAuth from "next-auth";
import Providers from "next-auth/providers";
async function signIn(user) {
  return user.email.endsWith("@middlebury.edu");
}
async function session(sessions, user) {
  sessions.user.id = user.id;
  return sessions
}
const options = {
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  database: process.env.DATABASE_URL,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {signIn: signIn, session: session}, 
};
export default (req, res) => NextAuth(req, res, options);
