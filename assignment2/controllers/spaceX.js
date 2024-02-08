import { validString } from "../utils/validation.js";
import spaceXApiController from "./apiController.js"
import { getRedisClient } from "../config/redisConnect.js";

export const getRockets = async(req, res)=>{
    console.log("rockets route");
    let result = undefined;
    try {
        result = await spaceXApiController.getRockets();
    }
    catch(error){
        if(error.response && error.response.status &&error.response.statusText){
            return res.status(error.response.status).json(error.response.statusText)
          }
        return res.status(400).json(error)
    }
    try{
        const client = await getRedisClient();
        await client.json.set('rockets', '$', result);
    } catch (error) {

    }
    return res.json(result);
}
export const getLaunches = async(req, res)=>{
    console.log("launches route");

    try {
        const result = await spaceXApiController.getLaunches();
       try {        
            const client = await getRedisClient();
            await client.json.set("launches", '$', result);
       } catch (error) {  
       }

        return res.json(result);
    } catch (error) {
        if(error.response && error.response.status &&error.response.statusText){
            return res.status(error.response.status).json(error.response.statusText)
          }
        return res.status(400).json(error)
    }
}
export const getCapsules = async(req, res)=>{
    console.log("capsules route");

    try {
        const result = await spaceXApiController.getCapsules();
        try {
            const client = await getRedisClient();
            await client.json.set("capsules", '$', result);
        } catch (error) {
            
        }

       return res.json(result);
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const getRocketsById = async(req, res)=>{
    console.log("rocket route");

    let {id} = req.params;

    try {
        id = validString(id)
        const result = await spaceXApiController.getRocketsById(id);

        try {
            const client = await getRedisClient();
            await client.json.set(`rocket:${id}`, '$', result);
            const jsonToString = JSON.stringify(result);
            await client.LPUSH('history', jsonToString);
            if(await client.LLEN('history') > 20){
                await client.RPOP('history');
            }
        } catch (error) {
            
        }

       return res.json(result);
    } catch (error) {
        if(error.response && error.response.status &&error.response.statusText){
          return res.status(error.response.status).json(error.response.statusText)
        }
        return res.status(400).json(error);
    }
}

export const getLaunchesById = async(req, res)=>{
    console.log("launch route");

    let {id} = req.params;
    try {
        id = validString(id)
        const result = await spaceXApiController.getLaunchesById(id);
        try {  
            const client = await getRedisClient();
            await client.json.set(`launche:${id}`, '$', result);
        } catch (error) {
            
        }
      
        res.json(result);
    } catch (error) {
        if(error.response && error.response.status && error.response.statusText){
            return res.status(error.response.status).json(error.response.statusText)
          }
          return res.status(400).json(error);    }
}
export const getCapsulesById = async(req, res)=>{
    console.log("capsule route");

    let {id} = req.params;

    try {
        id = validString(id)
        const result = await spaceXApiController.getCapsulesById(id);
        try {
            const client = await getRedisClient();
            await client.json.set(`capsule:${id}`, '$', result);
        } catch (error) {
            
        }
        return res.json(result);
    } catch (error) {
        if(error.response && error.response.status && error.response.statusText){
            return res.status(error.response.status).json(error.response.statusText)
        }
        return res.status(400).json(error);
    }
}

export const getRocketHistory = async(req, res)=>{
    try {
        const client = await getRedisClient();
        const strings = await client.LRANGE('history', 0, -1);
        const result = strings.map((obj)=>{ return JSON.parse(obj)});
        res.json(result);
    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}