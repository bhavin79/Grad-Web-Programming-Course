import axios from "axios";
import { useEffect, useState } from "react";
import {Link, useParams, useLocation} from 'react-router-dom';

export const GenericPage = ({category, listComponent})=>{
    const [launchData, setLaunchData] = useState(false);
    const [pageNumber, setPageNumber] = useState(Number(useParams().page)+1);
    const [prevNextPage, setPrevNextPage] = useState({prev: false, next: false});
    const [error, setError] = useState();

    console.log(useLocation());
    useEffect(()=>{
        const getLaunches = async()=>{
            try {
                const {data} = await axios.post(`https://api.spacexdata.com/v4/${category}/query`, {
                    query: {},
                    options: {  
                        limit: 10,
                        page: pageNumber
                    }
                  });
                console.log(data)
                if(data.page == null ||data.docs.length ==0){
                    setError(true);
                }
                setPrevNextPage({prev: data.hasPrevPage, next: data.hasNextPage});
                setLaunchData(data.docs);
            } catch (error) {
                //TODO: 404;
            }
        }

        if(!launchData){
            getLaunches();
        }

    }, [launchData])
    if(launchData){
        console.log(launchData);
        console.log(prevNextPage);
    }
    if(error){
        return <h2>404</h2>
    }
    return <>
        {launchData && <h2>Content exist</h2>}
        {prevNextPage.prev && <h2>Prev exists</h2>}
        {prevNextPage.next && <h2>Next exits</h2>}
    </>
}