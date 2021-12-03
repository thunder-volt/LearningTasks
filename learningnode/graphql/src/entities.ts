import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne} from  'typeorm';
import { ObjectType, Field } from 'type-graphql';

@Entity("User")
@ObjectType("User")
class User extends BaseEntity{
    
    @Column()
    @Field()
    username : string;

    @Column()
    @Field()
    password : string;

    @PrimaryColumn()
    @Field()
    email : string; 

    @Column({type : "float", nullable : true})
    @Field(_type => Number)
    age : number;
    
    @OneToMany(_type => Todo, Todo=> Todo.user)
    @Field(_type => [Todo])
    Todos : Todo[];

}

@Entity()
@ObjectType()
class Todo extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    @Field()
    taskvalue :string;

    // cascade true means todo.save implies it must also be saved under its user
    @ManyToOne(_type=>User,user=>user.Todos,{
        cascade:true
    })
    @Field(_type => User)
    user:User;

}

export {User,Todo}

