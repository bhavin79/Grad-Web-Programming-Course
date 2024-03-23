import { GenericPage } from "./genericPage";
import {useParams, useNavigate} from 'react-router-dom';
const LaunchList = ({data})=>{
    const navigate = useNavigate();
    let passFail = data.success?"Success":"Fail";
            return <div onClick = {()=>{navigate(`/launches/${data.id}`)}} className="card">
            <img src={data.links.patch.small} width="300" height="300" alt={data.name}></img>
            <div className="title">{data.name}</div>
            <div className="body">Flight Number: {data.flight_number}</div>
            <div className="tag2">{passFail}</div>
        </div>
}
export  const LaunchesPage = ()=>{    
    return <GenericPage category="launches" ListComponent={LaunchList}  pageNum = {Number(useParams().page)+1}/>
}