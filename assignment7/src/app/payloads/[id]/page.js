import { NotFound } from "@/component/NotFound";
import { getSingle, getAllIds } from "@/utility/helper";
import { Payload } from "./Payload";

export async function getStaticPaths() {    
    let ids = await getAllIds("payloads");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function PayloadSingle({params}){
    //Validate ID;
    const data = await getSingle("payloads", params.id);
 
    if(data){
       return <Payload payloadData={data}/>
    }else{
      return <NotFound/>
    }
}
