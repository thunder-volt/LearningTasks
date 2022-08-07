import { Field, ObjectType } from "type-graphql";

@ObjectType("loginOutput")
class LoginOutput {
  @Field()
  token: string;

  @Field((_type) => Boolean)
  status: boolean;
}

export default LoginOutput;
