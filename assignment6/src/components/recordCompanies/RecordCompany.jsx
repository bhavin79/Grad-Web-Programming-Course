import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { MyModal } from "../common/modal";
import { DeleteCompanyForm } from "./DeleteCompanyForm";
import { EditCompanyForm } from "./EditCompany";
import { getCompany } from "./queries"


export const RecordCompany = ()=>{
    const {loading, data, error} = useQuery(getCompany, {
        variables:{id:useParams().id},
        fetchPolicy: 'cache-and-network'
    });
    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        console.log(error);
        return <div className="flex justify-center mt-10 text-xl">
        <p>Not Found</p>
    </div>
    }
    if(data){
        console.log(data);
        const {getCompanyById: recordCompany} = data

        return <div className="flex flex-col mx-20 my-10">
            {recordCompany&& <div className="flex flex-col">
             <p className="text-5xl">{recordCompany.name}</p>
            <span>Found Year: {recordCompany.foundedYear}</span>
            
            <div className="my-10">
            
            <p>Country: {recordCompany.country}</p>
            <p> Number Of Albums: {recordCompany.numOfAlbums}</p>
            </div>

                <div>
                Albums: 
                    <ul>
                        {recordCompany.albums.map((album)=>{
                            return <li className="my-2 py-1 px-2 rounded-md bg-gray-300 w-1/4"> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                        })}
                    </ul>
                </div>
                </div>}
                <div className="flex flex-row justify-end mr-20">
                    <div className="mx-7">
                <MyModal CustomForm={EditCompanyForm} modalName={`${recordCompany.id}-edit`} data = {{id: recordCompany.id, name:recordCompany.name, country:recordCompany.country, foundedYear:recordCompany.foundedYear}} buttonName="Edit"/>
                  </div>
                    <div>  
                <MyModal CustomForm={DeleteCompanyForm} modalName={`${recordCompany.id}-del`} data = {{id:recordCompany.id, name:recordCompany.name}} buttonName="Remove"/>
                     </div>
            </div>
        </div>
    }
}