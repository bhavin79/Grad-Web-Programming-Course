import { GenericPage } from "./genericPage"
import { useNavigate } from "react-router-dom"
const RocketsList = ({data})=>{
    const navigate = useNavigate();
    let active = data.active?"Active": "Not Active"
    return <div onClick={()=>{
        navigate(`/rockets/${data.id}`)
    }} className="card">
        <img src={data.flickr_images[0]} width="300" height="300" alt={data.name}/>
        <div className="title">{data.name}</div>
        {data.country && <div className="body">{data.country}</div>}
        <div className="footer">{data.company}, Longitude:{data.longitude}</div>
        <div className="tag">{active}</div>

    </div>
}
export const RocketsPage = ()=>{
    return <>
        <GenericPage category="rockets" ListComponent={RocketsList}/>
    </>
}