import { GenericPage } from "./genericPage"
import {useNavigate} from 'react-router-dom';

const PayloadsList = ({data})=>{
  const navigate= useNavigate();
  return <div onClick={()=>{navigate(`/payloads/${data.id}`)}} className="card">
      <div className="payloadCardData">
          <div className="payloadCradName">
              <span>{data.name}</span>
              <hr></hr>
          </div>
          <div className="playloadCardChildData">
              <span>Type: {data.type} </span>
              <span>Reused: {String(data.reused)}</span>
          </div>
      </div>
    
  </div>
}
export const PayloadsPage = ()=>{
    return <>
      <GenericPage category="payloads" ListComponent={PayloadsList}/>
    </>
}