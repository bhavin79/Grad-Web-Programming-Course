import { GenericPage } from "./genericPage"
import { useNavigate } from "react-router-dom"
const ShipsList = ({data})=>{
    const navigate = useNavigate();
    return <article onClick={()=>navigate(`/ships/${data.id}`)} className="card">
        <h3>{data.name}</h3>
    </article>
  }

export const ShipsPage = ()=>{
    return <>
       <GenericPage category="ships" ListComponent={ShipsList}/>
    </>
}