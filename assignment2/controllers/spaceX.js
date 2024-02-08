import { validString } from "../utils/validation.js";
import spaceXApiController from "./apiController.js"
import { getRedisClient } from "../config/redisConnect.js";

export const getRockets = async(req, res)=>{
    console.log("rockets route");
    try {
        const result = await spaceXApiController.getRockets();
        const client = await getRedisClient();
        await client.json.set('rockets', '$', result);
        return res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getLaunches = async(req, res)=>{
    console.log("launches route");

    try {
        const result = await spaceXApiController.getLaunches();
        const client = await getRedisClient();
        await client.json.set("launches", '$', result);
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getCapsules = async(req, res)=>{
    console.log("capsules route");

    try {
        const result = await spaceXApiController.getCapsules();
        const client = await getRedisClient();
        await client.json.set("capsules", '$', result);
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getRocketsById = async(req, res)=>{
    console.log("rocket route");

    let {id} = req.params;

    try {
        id = validString(id)
        const result = await spaceXApiController.getRocketsById(id);
        const client = await getRedisClient();
        await client.json.set(`rocket:${id}`, '$', result);
        const jsonToString = JSON.stringify(result);
        await client.LPUSH('history', jsonToString);
        if(await client.LLEN('history') > 20){
            await client.RPOP('history');
        }
        res.json(result);
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
        const client = await getRedisClient();
        await client.json.set(`launche:${id}`, '$', result);
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
        const client = await getRedisClient();
        await client.json.set(`capsule:${id}`, '$', result);
        res.json(result);
    } catch (error) {
        if(error.response && error.response.status && error.response.statusText){
            return res.status(error.response.status).json(error.response.statusText)
        }
        return res.status(400).json(error);
    }
}