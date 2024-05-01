import { NotFound } from "@/component/NotFound";
import { getSingle, getAllIds } from "@/utility/helper";
import { Ship } from "./Ship";

export async function getStaticPaths() {    
    let ids = await getAllIds("ships");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function CoreSingle({params}){
    //Validate ID;
    const data = await getSingle("ships", params.id);
 
    if(data){
       return <Ship shipData = {data}/>
    }else{
      return <NotFound/>
    }
}
