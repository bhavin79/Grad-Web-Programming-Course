import { GenericPage } from '@/component/CommonPage';
import { LaunchList } from "@/component/LaunchList";
import { InValidInput } from "@/component/InValidInput";
import { NotFound } from "@/component/NotFound";
import { fetchData, getTotalPages } from "@/utility/helper";

export async function getStaticPaths() {    
    let pages = await getTotalPages("launches");
    return {
      paths: pages,
      fallback:true
    };
  }

export default async function LaunchPage({params}){
    let pageNumber = Number(params.page);
    if(isNaN(pageNumber) || pageNumber<0){
        return <InValidInput msg={"Page Number must be non negative digits"}/>;
    }
    const data = await fetchData("launches", pageNumber + 1);
    if(data.docs.length ==0){
        return <NotFound/>
    }
    
    if(data){
        return <GenericPage data={data} ListComponent={LaunchList} category="launches"/>
    }
}
