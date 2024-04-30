'use client'
import Link from 'next/link'

export const ShipsList = ({data})=>{
    return <Link href={`/ships/${data.id}`} className="card">
        {data.image && <img src={data.image} width="300" height="300" alt={data.name}/>}
        <div className="title">{data.name}</div>
        {data.home_port && <div className="body">{data.home_port}</div>}
        {data.image &&  <div className="tag">{String(data.type)}</div>}
    </Link>
  }
