import { GenericPage } from "./genericPage"
import { useNavigate } from "react-router-dom"
const ShipsList = ({data})=>{
    const navigate = useNavigate();
    return <div onClick={()=>navigate(`/ships/${data.id}`)} className="card">
        {data.image && <img src={data.image} width="300" height="300" alt={data.name}/>}
        <div className="title">{data.name}</div>
        {data.home_port && <div className="body">{data.home_port}</div>}
        {data.image &&  <div className="tag">{String(data.type)}</div>}
    </div>
  }

export const ShipsPage = ()=>{
    return <>
       <GenericPage category="ships" ListComponent={ShipsList}/>
    </>
}