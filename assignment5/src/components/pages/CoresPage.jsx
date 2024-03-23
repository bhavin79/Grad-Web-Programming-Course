import { GenericPage } from "./genericPage"
import {useNavigate} from 'react-router-dom';

const CoresList = ({data})=>{
    const navigate= useNavigate();
    return <div onClick={()=>{navigate(`/cores/${data.id}`)}} className="card">
         <div className="payloadCardData">
          <div className="payloadCradName">
              <span>{data.serial}</span>
              <hr></hr>
          </div>
          <div className="playloadCardChildData">
              <span>Status: {String(data.status)} </span>
          </div>
      </div>
    </div>
}
export const CoresPage = ()=>{

    return <>
        <GenericPage category="cores" ListComponent={CoresList}/>
    </>
}