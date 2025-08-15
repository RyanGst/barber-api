import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { bearer, openAPI } from "better-auth/plugins";

const client = new MongoClient(Bun.env.MONGO_URI);
const db = client.db();

export const authClient = betterAuth({
  plugins: [
    openAPI(),
    bearer(),

  ],
  trustedOrigins: ['http://localhost:3000', 'https://studio.ryanmac.dev'],
  emailAndPassword: {
    enabled: true
  },
  database: mongodbAdapter(db),
});
