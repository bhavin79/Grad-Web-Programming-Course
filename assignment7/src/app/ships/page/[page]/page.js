import { GenericPage } from '@/component/CommonPage';
import { InValidInput } from "@/component/InValidInput";
import { NotFound } from "@/component/NotFound";
import { fetchData, getTotalPages } from "@/utility/helper";
import { ShipsList } from './ShipsList';

export async function getStaticPaths() {    
    let pages = await getTotalPages("ships");
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
    const data = await fetchData("ships", pageNumber + 1);
    if(data.docs.length ==0){
        return <NotFound/>
    }
    
    if(data){
        return <GenericPage data={data} ListComponent={ShipsList} category="ships"/>
    }
}
