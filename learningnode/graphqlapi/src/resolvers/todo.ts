import MyContext from "../utils/context";
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
import Todo from "../entities/todo";
import { CreateTodoInput, UpdateTodoInput } from "../inputs/todo";
import User from "../entities/user";

@Resolver(() => Todo)
class TodoResolver {
  @Mutation(() => Todo)
  async createTodo(
    @Ctx() { user }: MyContext,
    @Arg("TodoInput") createTodoInput: CreateTodoInput
  ) {
    try {
      const todoCreated = await Todo.create({
        description: createTodoInput.description,
        user: user,
      }).save();
      return todoCreated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Query(() => [Todo])
  @Authorized()
  async getTodos(@Ctx() { user }: MyContext) {
    return user.todos;
  }

  @Mutation(() => Todo)
  @Authorized()
  async updateTodo(
    @Arg("Id") id: string,
    @Arg("UpdateTodoInput") updateTodoInput: UpdateTodoInput
  ) {
    try {
      const todo = await Todo.findOne({ where: { id: id } });
      if (!todo) throw new Error("Invalid Id");
      if (updateTodoInput.description)
        todo.description = updateTodoInput.description;
      const todoUpdated = await todo.save();
      return todoUpdated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteTodo(@Arg("Id") id: string) {
    try {
      const todo = await Todo.findOne({
        where: { id: id },
        relations: ["user"],
      });
      if (!todo) throw new Error("Invalid Id");
      const todoDeleted = await todo.remove();
      return !!todoDeleted;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @FieldResolver(() => User)
  async user(@Root() { id, user }: Todo) {
    try {
      if (user) return user;
      const todo = await Todo.findOne({
        where: { id: id },
        relations: ["user"],
      });
      return todo!.user;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }
}

export default TodoResolver;
