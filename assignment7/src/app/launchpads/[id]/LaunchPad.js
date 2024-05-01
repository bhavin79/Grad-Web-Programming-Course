'use client'

import { useState } from "react";
import Link from "next/link";

export const LaunchPad = ({launchPadData})=>{
    const [data, setData] = useState(launchPadData);

    const rocketExist = data.rockets.length>0;
    const launchExist = data.launches.length>0;
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
                                    {data.rockets.map((rocket, index)=>{
                                        return <li key={index}>
                                            <Link href = {`/rockets/${rocket}`}>{rocket}</Link>
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
                                {data.launches.map((launch,index)=>{
                                    return <li key={index}>
                                        <Link href = {`/launches/${launch}`}>{launch}</Link>
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