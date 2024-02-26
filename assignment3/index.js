import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

import {typeDefs} from './typeDefs.js';
import {resolvers} from './resolvers.js';
import {getRedisClient} from "./config/redisConnect.js"
import validations from './validation.js';
import { ObjectId } from 'mongodb';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
});

console.log(`Server ready at: ${url}`);
// const client = await getRedisClient();
// await client.flushDb();


