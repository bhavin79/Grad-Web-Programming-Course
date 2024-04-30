import { getSingle, getAllIds } from "@/utility/helper";

export async function getStaticPaths() {    
    let ids = await getAllIds("launchpads");
    return {
      paths:ids,
      fallback:true
    };
  }

export default async function CoreSingle({params}){
    //Validate ID;
    const data = await getSingle("launchpads", params.id);
 
    if(data){
       return <CoreIndi coreData = {data}/>
    }
}
