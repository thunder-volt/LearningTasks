import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Todo from "./todo";

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  email: string;

  @Column({ type: "float", nullable: true })
  @Field((_type) => Number)
  age: number;

  @OneToMany((_type) => Todo, (todos) => todos.user)
  @Field((_type) => [Todo])
  todos: Todo[];
}

export default User;
