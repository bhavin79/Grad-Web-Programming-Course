import { GenericPage } from "./genericPage";
import {useParams, useNavigate} from 'react-router-dom';
const LaunchList = ({data})=>{
    const navigate = useNavigate();
            return <article onClick = {()=>{navigate(`/launches/${data.id}`)}} className="card">
            <img src={data.links.patch.small}></img>
            <h3>{data.name}</h3>
            <h4>{data.flight_number}</h4>
        </article>
}
export  const LaunchesPage = ()=>{    
    return <GenericPage category="launches" ListComponent={LaunchList} pageNum = {Number(useParams().page)+1}/>
}