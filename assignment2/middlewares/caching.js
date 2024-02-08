import {getRedisClient} from "../config/redisConnect.js"
import { validString } from "../utils/validation.js";

export const rocketsCache = async (req, res, next)=>{
    console.log(`rockets middleware`)
    if(req.path.length>2){
        return next();
    }
    try {
        const client = await getRedisClient();
        const rocketData = await client.json.get('rockets');
        if(rocketData){
            return res.json(rocketData);
        }
    } catch (error) {
        
    }

    next();
}

export const launchesCache = async (req, res, next)=>{
    console.log(`launches middleware`)
    if(req.path.length>2){
        return next();
    }
    try {
        const client = await getRedisClient();
        const launchesData = await client.json.get('launches');
        if(launchesData){
            return res.json(launchesData);
        }
    } catch (error) {
        
    }

    next();
}
export const capsulesCache = async (req, res, next)=>{
    console.log(`capsules middleware`)
    if(req.path.length>2){
        return next();
    }
    try {
        const client = await getRedisClient();
        const capsulesData = await client.json.get('capsules');
        if(capsulesData){
            return res.json(capsulesData);
        }
    } catch (error) {
        
    }

    next();
}



export const rocketCache = async (req, res, next)=>{
    console.log(`rocket middleware`)

    let {id} = req.params;
    try {
        id = validString(id);
    } catch (error) {
        return res.status(400).json(error);
    }
    try {
        const client = await getRedisClient();
        const rocketData = await client.json.get(`rocket:${id}`);
        if(rocketData){
            const jsonToString = JSON.stringify(rocketData);
            await client.LPUSH('history', jsonToString);
            console.log(await client.LLEN('history'));
            if(await client.LLEN('history') > 20){
                await client.RPOP('history');
            }
            return res.json(rocketData);
        } 
    } catch (error) {
        
    }
 
    next();
}

export const launcheCache = async (req, res, next)=>{
    console.log(`launch middleware`)

    let {id} = req.params;
    try {
        id = validString(id);
    } catch (error) {
        return res.status(400).json(error);
    }
    try {
        const client = await getRedisClient();
        const launchData = await client.json.get(`launche:${id}`);
        if(launchData){
            return res.json(launchData);
        }
    } catch (error) {
        
    }

    next();
}
export const capsuleCache = async (req, res, next)=>{
    console.log(`capsule middleware`)

    let {id} = req.params;
    try {
        id = validString(id);
    } catch (error) {
        return res.status(400).json(error);
    }
    try {
        const client = await getRedisClient();
        const capsuleData = await client.json.get(`capsule:${id}`);
        if(capsuleData){
            return res.json(capsuleData);
        }
    } catch (error) {
        
    }

    next();
}