import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field } from "type-graphql";
import User from "./user";

@Entity("Todo")
@ObjectType("Todo")
class Todo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne((_type) => User, (user) => user.todos, {
    cascade: true,
  })
  @Field((_type) => User)
  user: User;
}

export default Todo;
