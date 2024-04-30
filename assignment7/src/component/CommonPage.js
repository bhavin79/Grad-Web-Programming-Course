'use client'
import { useState } from "react";
import Link from 'next/link'

export const GenericPage = ({data, ListComponent, category})=>{
    const [launchData, setLaunchData] = useState(data.docs);
    const prevNextPage ={prev:false, next:false};
    if(data.hasNextPage){
        prevNextPage.next= true;
    }
    if(data.hasPrevPage && data.page<=data.totalPages){
        prevNextPage.prev=true;
    }
    // const [prevNextPage, setPrevNextPage] = useState({prev: data.totalPages, next: data.hasNextPage});

    return <>
        {launchData && 
            <div className="listData">
           { launchData.map((data)=>{
                return <ListComponent data={data}/>
            })}
            </div>
        }
        <div>
            <div className="navigatioButton">
            {prevNextPage.prev  && <Link href={`/${category}/page/${data.page - 2}`}>
              <button >prev</button> </Link>
            }
           {prevNextPage.next&&  <Link href={`/${category}/page/${data.page}`}>
              <button >next</button> </Link>}
            </div>
        </div>
      
    </>
}