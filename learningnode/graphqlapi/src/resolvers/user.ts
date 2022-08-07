import User from "../entities/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserInput, LoginInput, UpdateUserInput } from "../inputs/user";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import LoginOutput from "../types/objects";
import MyContext from "../utils/context";

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
  async updateUser(@Arg("UpdateUserInput") updateUserInput: UpdateUserInput) {
    try {
      const userUpdated = new User();
      if (updateUserInput.username)
        userUpdated.username = updateUserInput.username;
      if (updateUserInput.email) userUpdated.email = updateUserInput.email;
      if (updateUserInput.password)
        userUpdated.password = updateUserInput.password;
      if (updateUserInput.age) userUpdated.age = updateUserInput.age;
      return userUpdated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }
}

export default UserResolver;
