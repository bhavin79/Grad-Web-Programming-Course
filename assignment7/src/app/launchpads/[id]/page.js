import { getSingle, getAllIds } from "@/utility/helper";
import { LaunchPad } from "./LaunchPad";

export async function getStaticPaths() {    
    let ids = await getAllIds("launchpads");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function LaunchPadSingle({params}){
    //Validate ID;
    const data = await getSingle("launchpads", params.id);
 
    if(data){
       return <LaunchPad launchPadData = {data}/>
    }
}
