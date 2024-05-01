'use client'

import { useState } from "react"
import Link from "next/link";

export const CoreIndi=({coreData})=>{
    const[data, setData] = useState(coreData);
    return <article>
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
                                <ol >
                                    {data.launches.map((launch, index)=>{
                                        return <li key={index} ><Link href ={`/launches/${launch}`}>{launch}</Link></li>
                                    })}
                                </ol>
                            </div>
                        }
                </div>
            </div>}   
        </article>
}