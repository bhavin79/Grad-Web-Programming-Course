import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const LaunchPad = ()=>{
    const [data, setData] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await axios.get(`https://api.spacexdata.com/v4/launchpads/${id}`);
            console.log(data);
            setData(data);
            }
        getData();    
    }, [])
    
    if(data.length <1){
        return <h1>Not found</h1>
    }
    return (
        <article>
            {data&& <>
                <img src={data.images.large}/>
                 <h3>{data.name}</h3>
            </>}   
        </article>
    )
}