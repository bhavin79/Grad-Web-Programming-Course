import axios from "axios";
import { validString } from "../utils/validation.js";

const API = axios.create({
    baseURL: "https://api.spacexdata.com/v4/",
  });

const getRockets = async()=>{
       const result = await API.get("rockets");
       return result.data;
    }

const getLaunches = async()=>{
        const result = await API.get("launches");
        return result.data;  
    }

const getCapsules = async()=>{
        const result = await API.get("capsules");
        return result.data;
    }

const getRocketsById = async(id)=>{
        id = validString(id, "Rocket ID");
        const result = await API.get(`rockets/${id}`);
        return result.data;
    }
  
const getLaunchesById = async(id)=>{
        id = validString(id, "Rocket ID");
        const result = await API.get(`launches/${id}`);
        return result.data;
     }
const getCapsulesById = async(id)=>{
        id = validString(id, "Rocket ID");

        const result = await API.get(`capsules/${id}`);
        return result.data;
   }
    
export default {getCapsules, getLaunches, getRockets, getCapsulesById, getLaunchesById, getRocketsById};