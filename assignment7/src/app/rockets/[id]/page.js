import { NotFound } from "@/component/NotFound";
import { getSingle, getAllIds } from "@/utility/helper";
import { Rocket } from "./Rocket";

export async function getStaticPaths() {    
    let ids = await getAllIds("rockets");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function RocketSingle({params}){
    //Validate ID;
    const data = await getSingle("rockets", params.id);
    if(data){
       return <Rocket rocketData = {data}/>
    }else{
      return <NotFound/>
    }
}
