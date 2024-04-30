'use client'
import Link from 'next/link'

export const CoresList = ({data})=>{
    return <Link href={`/cores/${data.id}`} className="card">
            <div className="payloadCardData">
            <div className="payloadCradName">
                <span>{data.serial}</span>
                <hr></hr>
            </div>
            <div className="playloadCardChildData">
                <span>Status: {String(data.status)} </span>
            </div>
      </div>
    </Link>
}