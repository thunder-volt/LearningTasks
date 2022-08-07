import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import jwt from "jsonwebtoken";
import resolvers from "./resolvers/index";
import entities from "./entities/index";
import authChecker from "./utils/authchecker";
import User from "./entities/user";

dotenv.config();

const main = async () => {
  const schema = await buildSchema({ resolvers, authChecker });

  const server = new ApolloServer({
    schema,
    context: async ({ req }: { req: any }) => {
      let user;
      if (req.headers.authorization) {
        try {
          const token = req.headers.authorization;
          const decoded: any = jwt.verify(
            token.split("Bearer ")[1],
            process.env.JWT_SECRET!
          );
          user = await User.findOne({ id: decoded });
        } catch (e) {
          console.log(`message ${e}`);
        }
      }
      return { user: user };
    },
  });

  server.listen(process.env.PORT || 8000, () =>
    console.log(`Server running: http://localhost:${process.env.PORT || 8000}`)
  );
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities,
  synchronize: true,
  logging: true,
})
  .then(() => {
    console.log("DATABASE CONNECTED");
    main();
  })
  .catch((e) => {
    console.log({ message: e });
  });
