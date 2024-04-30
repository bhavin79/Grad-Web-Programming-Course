import axios from "axios";
import { InValidInput } from "@/component/InValidInput";

export const fetchData = async(category, pageNumber)=>{
    const {data} = await axios.post(`https://api.spacexdata.com/v4/${category}/query`, {
        query: {},
        options: {  
            limit: 10,
            page: pageNumber
        }
      });
      return data;
}

export const getTotalPages = async(category)=>{
    let {totalPages} =  await fetchData(category, 1);

    let pages = Array.from({length: totalPages}, (_, i) =>{ 
        return {params:{ page : String(i) }}
    });
    return pages;
}
