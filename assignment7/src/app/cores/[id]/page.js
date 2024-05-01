import { NotFound } from "@/component/NotFound";
import { getSingle, getAllIds } from "@/utility/helper";
import { CoreIndi } from "./Core";

export async function getStaticPaths() {    
    let ids = await getAllIds("cores");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function CoreSingle({params}){
    //Validate ID;
    const data = await getSingle("cores", params.id);
 
    if(data){
       return <CoreIndi coreData = {data}/>
    }else{
     return <NotFound/>
    }
}
