import { GenericPage } from "./genericPage"
import {useNavigate} from 'react-router-dom';

const CoresList = ({data})=>{
    const navigate= useNavigate();
    return <article onClick={()=>{navigate(`/cores/${data.id}`)}} className="card">
        <h3>{data.serial}</h3>
    </article>
}
export const CoresPage = ()=>{

    return <>
        <GenericPage category="cores" ListComponent={CoresList}/>
    </>
}