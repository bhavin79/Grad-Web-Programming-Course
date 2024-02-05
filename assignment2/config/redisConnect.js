import { createClient } from 'redis';

const client = createClient();

const connectRedis = async()=>{
    try {
        await client.connect();
    } catch (error) {
        console.log(error);
    }
}

export const getRedisClient = async()=>{
    if(client.isReady && client.isReady){
        return client;
    }
    else{
        await connectRedis();
        return client;
    }
}
