import { ApolloServer } from "apollo-server"
import { Resolver, Query, buildSchema } from "type-graphql";
import 'reflect-metadata';

@Resolver(() => String)
class helloworld {
    @Query(() => String)
    hello() {
        return "HELLOWORLD";
    }
}

const main = async () => {
    const schema = buildSchema({resolvers : [helloworld]})
    const apolloServer = new ApolloServer({
        schema
    });
    apollolServer.listen(8000, (err)); 
}
 
main();