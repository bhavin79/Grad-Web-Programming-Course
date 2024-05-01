'use client'
import Link from 'next/link'

export const RocketsList = ({data})=>{
    let active = data.active?"Active": "Not Active"
    return <Link href={`/rockets/${data.id}`} className="card">
        <img src={data.flickr_images[0]} width="300" height="300" alt={data.name}/>
        <div className='cardBody'>
            <div className="title">{data.name}</div>
            {data.country && <div className="body">{data.country}</div>}
            <div className="footer">{data.company}, Longitude:{data.longitude}</div>
            <div className="tag">{active}</div>
        </div>

    </Link>
}