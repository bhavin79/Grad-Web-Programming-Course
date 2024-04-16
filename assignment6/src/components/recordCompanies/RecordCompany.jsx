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

        return <div className="flex justify-center items-center h-screen">
            {recordCompany&& <div className="flex flex-col">
             <p>Name: {recordCompany.name}</p>
                        
            <span> Number Of Albums: {recordCompany.numOfAlbums}</span>
            <span>Country: {recordCompany.country}</span>
            <span>Found Year: {recordCompany.foundedYear}</span>

                <div>
                Albums: 
                    <ul>
                        {recordCompany.albums.map((album)=>{
                            return <li> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                        })}
                    </ul>
                </div>
                </div>}
                <MyModal CustomForm={EditCompanyForm} modalName={`${recordCompany.id}-edit`} data = {{id: recordCompany.id, name:recordCompany.name, country:recordCompany.country, foundedYear:recordCompany.foundedYear}} buttonName="Edit"/>
                <MyModal CustomForm={DeleteCompanyForm} modalName={`${recordCompany.id}-del`} data = {{id:recordCompany.id, name:recordCompany.name}} buttonName="Remove"/>
        </div>
    }
}