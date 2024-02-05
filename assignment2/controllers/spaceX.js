import { validString } from "../utils/validation.js";
import spaceXApiController from "./apiController.js"

export const getRockets = async(req, res)=>{
    try {
        const result = await spaceXApiController.getRockets();
        return res.json(result[0]);
    } catch (error) {
        console.log(error);
    }
}
export const getLaunches = async(req, res)=>{
    try {
        const result = await spaceXApiController.getLaunches();
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getCapsules = async(req, res)=>{
    try {
        const result = await spaceXApiController.getCapsules();
        res.json(result);
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getRocketsById = async(req, res)=>{
    let {id} = req.params;

    try {
        id = validString(id)
        const result = await spaceXApiController.getRocketsById(id);
        res.json(result);
    } catch (error) {
        res.status(error.response.status).json(error.response.statusText)
    }
}

export const getLaunchesById = async(req, res)=>{
    let {id} = req.params;
    try {
        id = validString(id)
        const result = await spaceXApiController.getLaunchesById(id);
        res.json(result);
    } catch (error) {
        res.status(error.response.status).json(error.response.statusText)
    }
}
export const getCapsulesById = async(req, res)=>{
    let {id} = req.params;

    try {
        id = validString(id)
        const result = await spaceXApiController.getCapsulesById(id);
        res.json(result);
    } catch (error) {
        res.status(error.response.status).json(error.response.statusText)
    }
}