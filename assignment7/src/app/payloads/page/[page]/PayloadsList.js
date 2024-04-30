'use client'
import Link from 'next/link'

export const PayloadsList = ({data})=>{
    return <Link href= {`/payloads/${data.id}`} className="card">
        <div className="payloadCardData">
            <div className="payloadCradName">
                <span>{data.name}</span>
                <hr></hr>
            </div>
            <div className="playloadCardChildData">
                <span>Type: {data.type} </span>
                <span>Reused: {String(data.reused)}</span>
            </div>
        </div>
      
    </Link>
  }