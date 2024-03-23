import axios from "axios";
import {useEffect, useState } from "react";
import {useParams, useNavigate, redirect, useLocation} from 'react-router-dom';
import { Loading } from "../loading.jsx";
import { NotFound } from "../NotFound.jsx";

export const GenericPage = ({category, ListComponent})=>{
    const [launchData, setLaunchData] = useState(false);
    const pageNumber = (Number(useParams().page)+1);
    const [loading, setLoading] = useState(true);
    const [prevNextPage, setPrevNextPage] = useState({prev: false, next: false});
    const [error, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();

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
                setError(true);

            }
            setLoading(false)
        }
            getLaunches();
    }, [pageNumber, location])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <NotFound/>
    }
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
            {prevNextPage.prev && <button onClick={()=>{
                let prev = pageNumber;
                let url = `/${category}/page/${prev-2}`;
                navigate(url)
                }}>prev</button>}
           {prevNextPage.next&& <button onClick={()=>{
                let next = pageNumber;
                let url = `/${category}/page/${next}`;
                navigate(url);
            }}>next</button>}
            </div>
        </div>
      
    </>
}