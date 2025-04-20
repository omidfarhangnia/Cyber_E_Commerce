import NextAuth from "next-auth";

export const { handlers, signIn, auth } = NextAuth({
  providers: [],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
