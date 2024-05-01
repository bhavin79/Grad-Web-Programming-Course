'use client'
import { useState } from "react";
import Link from "next/link";

export const Launch = ({launchData})=>{
    const [data, setData] = useState(launchData);
    const payloadExist = data.payloads.length>0;
    const shipsExist = data.ships.length>0;
    const failExist = data.failures.length>0;
    const coreExist = data.cores.length>0;
    let capsuleExist = data.capsules.length>0;

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
                        {data.links.article && <Link href={data.links.article} className ="luanchIndiLink" target={"_blank"}>Article</Link>}
                        {data.links.wikipedia&& <Link href ={data.links.wikipedia} className ="luanchIndiLink" target={"_blank"}>Wikipedia</Link>}
                        {data.links.presskit&& <Link href ={data.links.presskit}className ="luanchIndiLink" target={"_blank"}>Presskit</Link>}
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
                            <span>Rocket: <Link href = {`/rockets/${data.rocket}`}>{data.rocket}</Link></span>
                            <span>Launchpad: <Link href = {`/launchpads/${data.launchpad}`}>{data.launchpad}</Link></span>

                            <div className="launcheGrid">
                                {failExist &&
                                    <div className="gridBox1">
                                        <div className="gridTitleLaunch">
                                            <span>Failure</span>
                                            <hr></hr>
                                        </div> 
                                        <div className="scrollSectionGrid">
                                            <ol>
                                                {data.failures.map((fail, index)=>{
                                                    return <li key={index}>
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
                                                {data.payloads.map((payload, index)=>{
                                                    return <li key={index}>
                                                    <Link href ={`/payloads/${payload}`}>{payload}</Link>
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
                                                {data.ships.map((ship, index)=>{
                                                    return <li key={index}>
                                                    <Link href ={`/ships/${ship}`}>{ship}</Link> 
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
                                                {data.capsules.map((capsule, index)=>{
                                                    return <li key={index}>
                                                    <Link href ={`/capsules/${capsule}`}>{capsule}</Link> 
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
                                                {data.cores.map((core, index)=>{
                                                    return <li key={index} >
                                                    <Link href ={`/cores/${core.core}`}> {core.core}</Link> 
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