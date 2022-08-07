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

  @Field((_type) => Number, { nullable: true })
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

@InputType("UpdateUserInput")
class UpdateUserInput {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field((_type) => Number, { nullable: true })
  age: number;
}

export { CreateUserInput, LoginInput, UpdateUserInput };
