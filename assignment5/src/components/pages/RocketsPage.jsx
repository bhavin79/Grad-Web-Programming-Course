import { GenericPage } from "./genericPage"
import { useNavigate } from "react-router-dom"
const RocketsList = ({data})=>{
    const navigate = useNavigate();
    return <article onClick={()=>{
        navigate(`/rockets/${data.id}`)
    }} className="card">
        {data.flickr_images && <img src={data.flickr_images[0]} width="300" height="300"/>}
        <h3>{data.name}</h3>
    </article>
}
export const RocketsPage = ()=>{
    return <>
        <GenericPage category="rockets" ListComponent={RocketsList}/>
    </>
}