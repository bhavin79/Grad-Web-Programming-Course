import { useEffect } from "react";
import { useParams, Link,useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotFound } from "./NotFound";
import { Loading } from "./loading";
export const Launch = ()=>{
    const [data, setData] = useState(false);
    const {id} = useParams();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const getData = async()=>{
            try { 
            const dat = await axios.get(`https://api.spacexdata.com/v4/launches/${id}`);
            console.log(data);
            setData(dat.data);
                
            } catch (error) {
              setError(true);
            }
            setLoading(false);
            }
        getData();    
    }, [])
    if(loading){
        return <Loading/>
    }
    if(error){
        return <NotFound/>
    }
    let payloadExist = false
    let shipsExist = false
    let capsuleExist = false
    let failExist = false
    let coreExist =false
    if(data != false){
         payloadExist = data.payloads.length>0;
         shipsExist = data.ships.length>0;
         failExist = data.failures.length>0;
         coreExist = data.cores.length>0;
    }
   

    return (
        <article>
            {data&& 
            <div className="launchesContainer">
                <div className="video">
                    <iframe
                    width="1080"
                    height="620"
                    src={`https://www.youtube.com/embed/${data.links.youtube_id}?autplay=1&muted=1`}
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    />
                </div>
                    <div className="launchesLink">
                        {data.links.article && <Link to={data.links.article} className ="luanchIndiLink" target={"_blank"}>Article</Link>}
                        {data.links.wikipedia&& <Link to ={data.links.wikipedia} className ="luanchIndiLink" target={"_blank"}>Wikipedia</Link>}
                        {data.links.presskit&& <Link to ={data.links.presskit}className ="luanchIndiLink" target={"_blank"}>Presskit</Link>}
                </div>
                <div className="headerLaunch">
                    <span>{data.name}</span>
                    <hr></hr>
                    <p>{data.details}</p>
                </div>
                <div className="bodyLaunch">
                    <div className="bodyLaunchDetail">
                            <span>{data.date_local}</span>
                            <span>Success: {String(data.success)}</span>
                            <span>Rocket: <Link to = {`/rockets/${data.rocket}`}>{data.rocket}</Link></span>
                            <span>Launchpad: <Link to = {`/launchpads/${data.launchpad}`}>{data.launchpad}</Link></span>

                            <div className="launcheGrid">
                                {failExist &&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Failure</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.failures.map((fail)=>{
                                                    return <li>
                                                    {fail.reason}
                                                    </li>
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }
                                {payloadExist&&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Payloads</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.payloads.map((payload)=>{
                                                    return <li>
                                                    <Link to ={`/payloads/${payload}`}>{payload}</Link>
                                                    </li>
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }
                                {shipsExist&&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Ships</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.ships.map((ship)=>{
                                                    return <li>
                                                    <Link to ={`/ships/${ship}`}>{ship}</Link> 
                                                    </li>
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }

                                {capsuleExist&&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Capsules</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.capsules.map((capsule)=>{
                                                    return <li>
                                                    <Link to ={`/capsules/${capsule}`}>{capsule}</Link> 
                                                    </li>
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }
                                {coreExist&&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Cores</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.cores.map((core)=>{
                                                    return <li >
                                                    <Link to ={`/cores/${core.core}`}> {core.core}</Link> 
                                                        <ul>
                                                            <li>Flight: {core.flight}</li>
                                                        </ul>
                                                    </li>
                                                })}
                                            </ol>
                                        </div>
                                    </div>
                                }
                            </div>

                    </div>
                </div>
             
            </div>}   

        </article>
    )
}