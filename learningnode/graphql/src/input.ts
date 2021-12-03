import {Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType("CreateInputUser")
class CreateInputUser {
    @Field()
    username : string;

    @Field()
    @IsEmail()
    email : string;

    @Field()
    password: string;

    @Field({nullable: true})
    age : number;
}


@InputType("CheckInputUser")
class CheckInputUser {
    @Field()
    @IsEmail()
    email : string;

    @Field()
    password: string;

}

export {CreateInputUser, CheckInputUser}
