'use client'
import Link from 'next/link'

export const LaunchList = ({data})=>{
    let passFail = data.success?"Success":"Fail";
            return <div key={data.id}>
                 <Link href={`/launches/${data.id}`} className="card">
                    <img src={data.links.patch.small} width="300" height="300" alt={data.name}></img>
                    <div className='cardBody'>
                        <div className="title">{data.name}</div>
                        <div className="body">Flight Number: {data.flight_number}</div>
                        <div className="tag2">{passFail}</div>
                    </div>
                </Link>
        </div>
}