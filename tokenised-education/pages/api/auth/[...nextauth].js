import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";
import connectDB from "../../../lib/connectDB";
import Users from "../../../lib/userSchema";
import Students from "../../../lib/studentSchema";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials;

          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          const { address, profileId, expirationTime } = (
            await Moralis.Auth.verify({ message, signature, network: "evm" })
          ).raw;

          const user = { address, profileId, expirationTime, signature };

          // Connecting Mongo DB, retreiving
          await connectDB();
          const User = await Users.findOne({ profileId: profileId });

          if (User == null) {
            console.log(null);
            const newUser = new Users({
              profileId: profileId,
              publicAddress: address,
              accountType: null,
              name: null,
            });
            await newUser.save();
         
          }

          return user;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
