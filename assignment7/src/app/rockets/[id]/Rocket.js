'use client'

import Link from "next/link";
import { useState } from "react";


export const Rocket = ({rocketData})=>{
    const [data, setData] = useState(rocketData);
    console.log(data)
    let  reusable = data.first_stage.reusable?"Yes":"No";
    return (
        <div>
       {data &&
        <div className="containerRocket">
        <img src={data.flickr_images[0]} alt={data.name}/>
            <div className="headerRocket">
                <div className="headerRocketBox">
                    <div className="R_title">
                    <span>{data.name}</span>
                    </div>
                  
                    <span>{data.country}</span>
                </div>
                <div className="headerRocketBox">
                    <span>{data.first_flight}</span>
                    <span>{data.company}</span>
                </div>
            </div>
            <div className="rocketBody">
                <p>{data.description}</p>
                {data.wikipedia &&
                <span>
                 <Link href={data.wikipedia} target="_blank" className="RB_Link"><span>read more</span></Link>
                </span>
                }
            </div>
            <div className="rocketGridBox2">
                    <span>Technical overview</span>
            </div>
            <div className="footerRocketExtraDetail">
               <div className="rocketGridBox1">
                    <span>Cost per Launch: {data.cost_per_launch}</span>
                    <span>Stages: {data.stages}</span>
                    <span>Success rate: {data.success_rate_pct}%</span>
               </div>
              
               <div className="rocketGridBox3">
                    <span>Dimensions</span>
                    <ul>   
                        <li>Height: {data.height.feet}ft {data.height.meters}m</li>
                        <li>Diameter: {data.diameter.feet}ft {data.diameter.meters}m</li>
                        <li>Mass: {data.mass.kg}kg</li>
                    </ul>
               </div>
               <div className="rocketGridBox3">
                    <span>First Stage</span>
                    <ul>
                        <li>Thrust Sea Level: {data.first_stage.thrust_sea_level.kN}kN</li>
                        <li>Thrust Vacuum: {data.first_stage.thrust_vacuum.kN}kN</li>
                        {reusable &&<li>Reusable: {reusable}</li>}
                        <li>Engines: {data.first_stage.engines}</li>
                        <li>Fuel: {data.first_stage.fuel_amount_tons} tons</li>
                        <li>Burn time: {data.first_stage.burn_time_sec} seconds</li>
                    </ul>
               </div>
               <div className="rocketGridBox3">
                    <span>Second Stage</span>
                    <ul>
                        <li>Thrust: {data.second_stage.thrust.kN}kN</li>
                        <li>Engines: {data.second_stage.engines}</li>
                        <li>Fuel: {data.second_stage.fuel_amount_tons} tons</li>
                        <li>Burn time: {data.second_stage.burn_time_sec} seconds</li>
                        <li>Payloads:</li>
                        <div className="R_innerList">
                            <ul>
                                <li>composite fairing height: {data.second_stage.payloads.composite_fairing.height.feet}ft</li>
                                <li>composite fairing diameter: {data.second_stage.payloads.composite_fairing.diameter.feet}ft</li>
                            </ul>
                        </div>
                    </ul>
               </div>
            </div>
        </div>}
    </div>
    )
}