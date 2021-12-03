import { ApolloServer } from "apollo-server";
import { Arg, Resolver, Query, Ctx, buildSchema, Mutation, Authorized } from "type-graphql";
import "reflect-metadata";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { User, Todo } from "./entities";
import { CreateInputUser, CheckInputUser } from "./input";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { AuthChecker } from "type-graphql";

interface MyContext {
  user: User;
}

const authChecker: AuthChecker<MyContext> = async ({ context: { user } }) => {
  if (user) return true;
  return false;
};

dotenv.config();

//in graphql query is used to get data whereas mutation is for all other operation
var token;
const secret = "This is a secret string";

@Resolver()
class USER_TODO_CRUD {
  @Query(() => [User])
  @Authorized()
  getusers(){
    const users = User.find();
    return users; 
  }

  @Query(() => [Todo])
  @Authorized()
  getTodos(@Ctx() { user }: MyContext){
    const todos = Todo.find({user : user});
    return todos;
  }

  @Mutation(() => Boolean)
  @Authorized()
  async createUser(@Arg("DATA") createUserInput: CreateInputUser) {
    try {
      let user = await User.findOne({ email: createUserInput.email });
      if (user) {
        console.log("Email already exists");
        return false;
      } else {
        user = await User.findOne({ username: createUserInput.username });
        if (user) {
          console.log("Usename alrady Taken");
          return false;
        } else {
          const user = new User();
          user.username = createUserInput.username;
          user.email = createUserInput.email;
          user.password = bcryptjs.hashSync(createUserInput.password, 8);
          user.age = createUserInput.age;
          user.save();
          return !!user;
        }
      }
    } catch (e) {
      console.log({ message: e });
      return false;
    }
  }

  @Mutation(() => String)
  async userlogin(@Arg("Check") checkInputUser: CheckInputUser) {
    try {
      const user = await User.findOne({ email: checkInputUser.email });
      if (user) {
        var passwordIsvalid = bcryptjs.compareSync(
          checkInputUser.password,
          user.password
        );
        if (passwordIsvalid) {
          token = jwt.sign({ email: user.email }, secret);
          return `Access token: ${token}`;
        } else {
          return "Invalid Password";
        }
      } else {
        console.log("Requeseted User not Found");
        return false;
      }
    } catch (e) {
      console.log({ message: e });
      return false;
    }
  }

  @Mutation(() => Boolean)
  updateuser(
    @Ctx() { user }: MyContext,
    @Arg("UPDATE") updateUserInput: CreateInputUser
  ) {
    try {
      user.username = updateUserInput.username;
      user.password = bcryptjs.hashSync(updateUserInput.password, 8);
      user.age = updateUserInput.age;
      user.save();
      console.log("Updated");
      return !!user;
    } catch (e) {
      console.log({ message: e });
      return false;
    }
  }

  @Mutation(() => Boolean)
  craeteTODO(@Ctx() { user }: MyContext, @Arg("ADDTODO") Taskvalue: string) {
    try {
      //console.log(req.body);
      const todo = new Todo();
      todo.user = user;
      todo.taskvalue = Taskvalue;
      todo.save();
      console.log("ADDED TDOD");
      return !!todo;
    } catch (e) {
      //console.log("HI");
      console.log({ message: e });
      return true;
    }
  }

  @Mutation(() => Boolean)
  async updatetodo(@Arg("UPDATETODO") Id: string, newtask: string) {
    try {
      const todo = await Todo.findOne({ id: Id });
      if (todo) {
        todo.taskvalue = newtask;
        console.log("Updated !");
        todo.save();
        return !!todo;
      } else {
        console.log("Not Found");
        return false;
      }
    } catch (e) {
      console.log({ message: e });
      return false;
    }
  }

  @Mutation(() => Boolean)
  deletetodo(@Arg("DELETETODO") Id: string) {
    try {
      Todo.delete({ id: Id });
      console.log("Deleted todo");
      return true;
    } catch (err) {
      console.log({ message: err });
      return false;
    }
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [USER_TODO_CRUD],
    authChecker: authChecker,
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }: { req: any }) => {
      let user;
      if (req.headers.authorization) {
        const token = req.headers.authorization;
        const decoded: any = jwt.verify(token, secret);
        user = await User.findOne({ email: decoded.email });
      }
      return { user: user };
    },
  });
  apolloServer
    .listen(8000)
    .then(({ url }) => {
      console.log(`serving on ${url}`);
    })
    .catch((e) => console.log(e));
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Todo],
  synchronize: true,
  logging: true,
})
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((e) => {
    console.log({ message: e });
  });

main();
