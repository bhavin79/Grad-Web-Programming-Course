import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotFound } from "./NotFound";
import { Loading } from "./loading";

export const LaunchPad = ()=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await axios.post(`https://api.spacexdata.com/v4/launchpads/query`, {
                query: {},
                options: {
                    populate:[
                        {
                            "path": "rockets",
                            "select": {
                              "name": 1
                            }
                          },
                          {
                            "path": "launches",
                            "select": {
                              "name": 1
                            }
                          }
                    ]
                }
            });
          
            let launchpd = data.docs.filter((lpd)=>{
                return lpd.id == id;
            })
            console.log(launchpd);

            if(launchpd.length == 0){
                setError(true);
            }else{
                setData(launchpd[0]);
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
    let rocketExist = false;
    let launchExist= false;
    if(data){
        rocketExist = data.rockets.length>0;
        launchExist = data.launches.length>0;
    }
    

    return (
        <article className="launchPad">
            {data&& <>
                <div className="imgWrapper">
                    <img className="launchpadimg" width="200" height="200" src={data.images.large} alt={data.full_name}/>
                </div>
                <div className="launchpadDataWrapper">
                    <div className="D_title">{data.full_name}</div>
                    <div className="D_location">{data.locality}, {data.region}</div>
                    <div className="D_body">
                         {data.details}
                    </div>
                    <div className="innerFlexBoxLaunchPad">
                        <div className="box1">
                            Launch Attempts: {data.launch_attempts} <br/>
                            Launch Attempts: {data.launch_successes} <br/>
                            Status: {data.status}
                        </div>
                        <div className="box1">
                            Latitude: {data.latitude} <br/>
                            Longitude: {data.longitude}
                        </div>
                    </div>
                    <div className="innerFlexBoxLaunchPad2">
                        
                        {rocketExist &&
                        <div className="launchpadBox2">
                            <div className="LP_Links">
                                <span>Rockets</span>
                                <ul>
                                    {data.rockets.map((rocket)=>{
                                        return <li>
                                            <Link to = {`/rockets/${rocket.id}`}>{rocket.name}</Link>
                                        </li>
                                    })}
                                </ul>
                                </div>
                            </div>
                            }
                       
                        {launchExist &&
                         <div className="launchpadBox2">
                            <div className="LP_Links">
                            <span>Launches</span>
                            <ul>
                                {data.launches.map((launch)=>{
                                    return <li>
                                        <Link to = {`/launches/${launch.id}`}>{launch.name}</Link>
                                    </li>
                                })}
                            </ul>
                            </div>
                            </div>
                        }
                     
                    </div>
                </div>

            </>}   
        </article>
    )
}