import User from "../entities/todo";
import { Authorized, Mutation, Query, Resolver } from "type-graphql";
import Todo from "../entities/todo";

@Resolver(() => Todo)
class TodoResolver {
  @Mutation(() => Todo)
  async createTodo() {}

  @Query(() => [User])
  @Authorized()
  async getTodos() {}

  @Mutation(() => Boolean)
  @Authorized()
  async updateTodo() {}

  @Mutation(() => Boolean)
  @Authorized()
  async deleteTodo() {}
}

export default TodoResolver;
