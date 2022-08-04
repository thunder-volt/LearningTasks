import User from "../entities/user";
import { Authorized, Mutation, Query, Resolver } from "type-graphql";

@Resolver(() => User)
class UserResolver {
  @Mutation(() => User)
  async createUser() {
    
  }

  @Mutation(() => String)
  async login() {}

  @Query(() => [User])
  @Authorized()
  async getUsers() {}

  @Mutation(() => Boolean)
  @Authorized()
  async updateuser() {}

  @Mutation(() => Boolean)
  @Authorized()
  async deleteUser() {}
}

export default UserResolver;
