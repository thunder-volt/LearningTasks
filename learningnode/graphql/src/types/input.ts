import { Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType("CreateUserInput")
class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  age: number;
}

@InputType("LoginInput")
class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

export { CreateUserInput, LoginInput };
