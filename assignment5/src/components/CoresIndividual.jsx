import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotFound } from "./NotFound";
import { Loading } from "./loading";

export const Cores = ()=>{
    const [data, setData] = useState([]);
    const {id} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getData = async()=>{
            try {
                const {data} = await axios.get(`https://api.spacexdata.com/v4/cores/${id}`);
                setData(data);
            } catch (error) {
                setError(true)
                }
                setLoading(false)
            }

        getData();    
    }, [])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <NotFound/>
    }
    return (
        <article>
            {data&& 
            <div className="coresContainer">
                <div className="coresTitle">
                    <span>{data.serial}</span>
                    <hr></hr>
                </div>
                {data.last_update && <span>Last Update: {data.last_update}</span>}
                {data.status && <span>Status: {data.status} </span>}
                <div className="coresGrid">
                        <div className="coresGridBox1">
                            <div>
                                 <span>Stats</span>
                                 <hr></hr>
                            </div>         
                            <span>Reuse Count: {data.reuse_count}</span>
                            <span>RTLS Attempts: {data.rtls_attempts}</span>
                            <span>RTLS Landings: {data.rtls_landings}</span>
                            <span>ASDS Attempts: {data.asds_attempts}</span>
                            <span>ASDS Landings: {data.asds_landings}</span>
                        </div>
                        {data.launches &&  
                            <div className="coresGridBox2">
                                <div> 
                                     <span>Lunches</span>
                                     <hr></hr>
                                </div>
                                <ol>
                                    {data.launches.map((launch)=>{
                                        return <li><Link to ={`/launches/${launch}`}>{launch}</Link></li>
                                    })}
                                </ol>
                            </div>
                        }
                </div>
            </div>}   
        </article>
    )
}