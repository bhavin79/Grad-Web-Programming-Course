'use client'
import Link from "next/link";
import { useState } from "react";


export const Ship = ({shipData})=>{
    const [data, setData] = useState(shipData);
    let active = data.active?"Yes":"No";
    let launchExist = data.launches.length>0?true:false;
    let rolesExist = data.roles.length>0?true:false;
    let technicalExists = false;
        if(data.imo ||data.mmsi||data.abs|| data.class || data.mass_kg ||data.course_deg ||data.speed_kn ||data.latitude ||data.longitude){
            technicalExists = true;
        }
    return (
        <article>
            {data&& <div className="ShipContainer">
            <div className="shipTitle">
                <span>
                    {data.name}
                </span>
            </div>
            <div className="shipGrid1">
                <div className="shipFlex1">
                    <div className="shipHeadingSubdetails">
                        <span>id: {data.legacy_id}</span>
                        <span>Type: {data.type}</span>
                    </div>
                </div>
                <div className="shipFlex2">
                    {data.last_ais_update && <span>Last Ais Update: {data.last_ais_update}</span>}
                    {data.model && <span>Modele: {data.model}</span>}
                    {data.year_built && <span>Year built: {data.year_built}</span>}
                     <span> Active: {active}</span>
                    {data.home_port && <span>Home Port: {data.home_port}</span>}
                </div>
            </div>
            <div>
             <hr></hr>
            </div>
                <div className="shipGrid2">
                    {technicalExists&& <div className="shipFlex3">
                        <div className="shipLocalHeading">
                            <span>Technicals</span>
                            <hr></hr>
                        </div>
                        {data.imo && <span>IMO: {data.imo}</span>}
                        {data.mmsi && <span>MMSI: {data.mmsi}</span>}
                        {data.abs && <span>ABS: {data.abs}</span>}
                        {data.class && <span>Class: {data.class}</span>}
                        {data.mass_kg && <span>Mass: {data.mass_kg}kg</span>}
                        {data.course_deg && <span>Course (degree): {data.course_deg}</span>}
                        {data.speed_kn && <span>Speed: {data.speed_kn}kn</span>}
                        {data.latitude && <span>Latitude: {data.latitude}</span>}
                        {data.longitude && <span>Longitude: {data.longitude}</span>}
                        {data.link && 
                        <div className="moreLinkShip">
                            <Link href={data.link} target={"_blank"}>
                                <span>More</span>
                                </Link>
                        </div>
                        }
                    </div>}
                    <div className="shipFlex4">
                    {launchExist &&  <div className="wrapperShip">
                            <div className="shipLocalHeading">
                                    <span>Launches</span>
                                    <hr></hr>
                                </div>
                                <div className="innerFlex">
                                    <ul>
                                        {data.launches.map(((launch, index)=> <li key={index}><Link href={`/launches/${launch}`}>{launch}</Link></li>))}
                                    </ul>
                                </div>
                        </div>}
                        {rolesExist &&  <div className="wrapperShip">
                            <div className="shipLocalHeading">
                                <span>Roles</span>
                                <hr></hr>
                            </div>
                            <div className="innerFlex">
                            <ul>
                                {data.roles.map((role, index)=><li key={index}>{role}</li>)}
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>}   
        </article>
    )
}