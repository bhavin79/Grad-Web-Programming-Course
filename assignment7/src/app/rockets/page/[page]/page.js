import { GenericPage } from '@/component/CommonPage';
import { InValidInput } from "@/component/InValidInput";
import { NotFound } from "@/component/NotFound";
import { fetchData, getTotalPages } from "@/utility/helper";
import { RocketsList } from './RocketList';

export async function getStaticPaths() {    
    let pages = await getTotalPages("rockets");
    return {
      paths: pages,
      fallback:true
    };
  }

export default async function PayloadsPage({params}){
    let pageNumber = Number(params.page);
    if(isNaN(pageNumber) || pageNumber<0){
        return <InValidInput msg={"Page Number must be non negative digits"}/>;
    }
    const data = await fetchData("rockets", pageNumber + 1);
    if(data.docs.length ==0){
        return <NotFound/>
    }
    
    if(data){
        return <GenericPage data={data} ListComponent={RocketsList} category="rockets"/>
    }
}
