import { getSingle, getAllIds } from "@/utility/helper";
import { Launch } from "./Launch";

export async function getStaticPaths() {    
    let ids = await getAllIds("launches");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function LaunchSingle({params}){
    //Validate ID;
    const data = await getSingle("launches", params.id);
 
    if(data){
       return <Launch launchData = {data}/>
    }
}
