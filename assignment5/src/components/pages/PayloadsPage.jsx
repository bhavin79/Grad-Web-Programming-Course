import { GenericPage } from "./genericPage"
import {useNavigate} from 'react-router-dom';

const PayloadsList = ({data})=>{
  const navigate= useNavigate();
  return <article onClick={()=>{navigate(`/payloads/${data.id}`)}} className="card">
      <h3>{data.name}</h3>
  </article>
}
export const PayloadsPage = ()=>{
    return <>
      <GenericPage category="payloads" ListComponent={PayloadsList}/>
    </>
}