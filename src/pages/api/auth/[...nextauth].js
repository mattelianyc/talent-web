// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import InstagramProvider from "next-auth/providers/instagram";
import axios from 'axios'; // You might use axios to communicate with your NestJS backend

console.log('insta id     ', process.env.INSTAGRAM_CLIENT_ID)
console.log('insta  secret  ', process.env.INSTAGRAM_CLIENT_SECRET)

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Here you call your NestJS backend to authenticate the user
          const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/auth/login', {
            username: credentials.username,
            password: credentials.password,
          });

          // If successful, return the user object
          if (data.user) {
            return data.user;
          }
        } catch (e) {
          // Return null if authentication fails
          return null;
        }
        return null;
      },
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    }),
  ],
  // pages: {
    // signIn: '/auth/signin', // Specify custom signin page path
    // Define other custom pages if necessary
  // },
  // Add other NextAuth.js configurations as needed
});
