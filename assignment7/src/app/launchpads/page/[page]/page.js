import { GenericPage } from '@/component/CommonPage';
import { LaunchPadsList } from './LaunchPadsList';
import { InValidInput } from "@/component/InValidInput";
import { NotFound } from "@/component/NotFound";
import { fetchData, getTotalPages } from "@/utility/helper";

export async function getStaticPaths() {    
    let pages = await getTotalPages("launchpads");
    return {
      paths: pages,
      fallback:true
    };
  }

export default async function LaunchPadsPage({params}){
    let pageNumber = Number(params.page);
    if(isNaN(pageNumber) || pageNumber<0){
        return <InValidInput msg={"Page Number must be non negative digits"}/>;
    }
    const data = await fetchData("launchpads", pageNumber + 1);
    console.log(data);
    if(data.docs.length ==0){
        return <NotFound/>
    }
    
    if(data){
        return <GenericPage data={data} ListComponent={LaunchPadsList} category="launchpads"/>
    }
}
