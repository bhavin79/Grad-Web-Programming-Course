import axios from "axios";
import {useEffect, useState } from "react";
import {useParams, useNavigate, redirect, useLocation} from 'react-router-dom';

export const GenericPage = ({category, ListComponent})=>{
    const [launchData, setLaunchData] = useState(false);
    const [pageNumber, setPageNumber] = useState(Number(useParams().page)+1);
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
                //TODO: 404;
            }
        }
            getLaunches();
    }, [pageNumber, location])

    if(error){
        return <h2>404</h2>
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
            <span>
            {prevNextPage.prev && <button onClick={()=>{
                let prev = pageNumber;
                let url = `/${category}/page/${prev-2}`;
                // window.history.pushState({ path: url }, '', url);
                navigate(url);
                setPageNumber(pageNumber -1);
                // redirect(url);
                }}>prev</button>}
            {pageNumber}
            {prevNextPage.next && <button onClick={()=>{
                let next = pageNumber;
                let url = `/${category}/page/${next}`;
                navigate(url);
                setPageNumber(pageNumber + 1);
            }}
                >next</button>}
            </span>
        </div>
      
    </>
}