import { Field, InputType } from "type-graphql";

@InputType("CreateTodoInput")
class CreateTodoInput {
  @Field()
  description: string;
}

@InputType("UpdateTodoInput")
class UpdateTodoInput {
  @Field({ nullable: true })
  description: string;
}
export { CreateTodoInput, UpdateTodoInput };
