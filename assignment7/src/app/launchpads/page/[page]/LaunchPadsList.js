'use client'
import Link from 'next/link'


export const LaunchPadsList = ({data})=>{
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
    
    return <Link href = {`/launchpads/${data.id}`} className="card">
        <img src={data.images.large} width="300" height="300" alt={data.name}/>
        <div className="title">{data.name}</div>
        {locality && <div className="body">{locality}</div>}
        <div className="footer">Latitude: {data.latitude}, Longitude:{data.longitude}</div>
        <div className="tag">{data.status}</div>
    </Link>
} 