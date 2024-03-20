import { useNavigate } from "react-router-dom"
import { GenericPage } from "./genericPage"

const LaunchpadsList = ({data})=>{
    const navigate = useNavigate();
    return <article onClick={()=>navigate(`/launchpads/${data.id}`)} className="card">
        <img src={data.images.large} width="300" height="300"/>
        <h3>{data.name}</h3>
    </article>
}
export const LaunchpadsPage = ()=>{      
    return <>
       <GenericPage category="launchpads" ListComponent={LaunchpadsList}/>
    </>
}
