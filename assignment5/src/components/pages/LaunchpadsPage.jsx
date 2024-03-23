import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { GenericPage } from "./genericPage"

const LaunchpadsList = ({data})=>{
    const navigate = useNavigate(); 
    let locality = ""
    if(data.locality){
        locality +=data.locality;
    }
    if(data.region){
        if(locality.length>0){
            locality += `, ${data.region}`;
        }else{
            locality += data.region;
        }
    }

    return <div onClick={()=>navigate(`/launchpads/${data.id}`)} className="card">
        <img src={data.images.large} width="300" height="300" alt={data.name}/>
        <div className="title">{data.name}</div>
        {locality && <div className="body">{locality}</div>}
        <div className="footer">Latitude: {data.latitude}, Longitude:{data.longitude}</div>
        <div className="tag">{data.status}</div>
    </div>
}
export const LaunchpadsPage = ()=>{      
    return <>
       <GenericPage category="launchpads" ListComponent={LaunchpadsList}/>
    </>
}
