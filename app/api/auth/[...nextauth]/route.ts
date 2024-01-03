import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import toast from "react-hot-toast";
import getUser from "@/actions/get-user";
import loginUser from "@/actions/post-user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          placeholder: "Enter password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password)
            return null;
          const user = await loginUser(credentials.email, credentials.password);
          if (
            user &&
            user.password === credentials.password &&
            user.email === credentials.email
          ) {
            toast.success(`Welcome back ${user.name}!`);
          }
          return user;
        } catch (error) {
          console.error("Error in authorize function:", error);
          toast.error("Error signing in");
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user is logging in, add the user's name and email to the token
      if (user) {
        token.id = user.id; // Change this to the appropriate property in your user object
        token.name = user.name; // Change this to the appropriate property in your user object
        token.email = user.email; // Change this to the appropriate property in your user object
      }

      // You can add additional data to the token if needed

      return token;
    },
    async session({ session, token }) {
      // You can modify the session object here

      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
