import User from "../entities/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserInput, LoginInput, UpdateUserInput } from "../inputs/user";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import LoginOutput from "../types/objects";
import MyContext from "../utils/context";
import Todo from "src/entities/todo";

@Resolver(() => User)
class UserResolver {
  //@Arg decorator is bieng used to create agruments, string inside "" will soecify its name
  @Mutation(() => User)
  async createUser(@Arg("CreateUserInput") createUserInput: CreateUserInput) {
    try {
      const userCreated = await User.create({
        username: createUserInput.username,
        email: createUserInput.email,
        password: bcryptjs.hashSync(
          createUserInput.password,
          Number(process.env.ITR)
        ),
      }).save();
      return userCreated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Mutation(() => LoginOutput)
  async login(@Arg("LoginInput") { email, password }: LoginInput) {
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) throw new Error("Invalid Email");
      const passwordIsValid = bcryptjs.compareSync(password, user.password);
      if (!passwordIsValid) throw new Error("Invalid Credentials");
      // jason-web-token for authorisation
      let token = jwt.sign(user.id, process.env.JWT_SECRET!);
      return { token: token, status: true };
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  // Ctx is used to access the User object from the context
  @Query(() => User)
  @Authorized()
  async getMe(@Ctx() { user }: MyContext) {
    return user;
  }

  @Mutation(() => User)
  @Authorized()
  async updateUser(
    @Ctx() { user }: MyContext,
    @Arg("UpdateUserInput") updateUserInput: UpdateUserInput
  ) {
    try {
      if (updateUserInput.username) user.username = updateUserInput.username;
      if (updateUserInput.email) user.email = updateUserInput.email;
      if (updateUserInput.password)
        user.password = bcryptjs.hashSync(
          updateUserInput.password,
          Number(process.env.ITR)
        );
      if (updateUserInput.age) user.age = updateUserInput.age;
      const userUpdated = await user.save();
      return userUpdated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @FieldResolver(() => [Todo])
  async todos(@Root() { id, todos }: User) {
    try {
      if (todos) return todos;
      const user = await User.findOne({
        where: { id: id },
        relations: ["todos"],
      });
      return user!.todos;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }
}

export default UserResolver;
