import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
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
        return <h1>Something went wrong</h1>
    }
    if(data){
        console.log(data);
        const {getCompanyById: recordCompany} = data

        return <div className="flex justify-center items-center h-screen">
            {recordCompany&& <div className="flex flex-col">
             <p>Name: {recordCompany.name}</p>
                        
            <span> Number Of Albums: {recordCompany.numOfAlbums}</span>
            <span>Country: {recordCompany.country}</span>
    
                <div>
                Albums: 
                    <ul>
                        {recordCompany.albums.map((album)=>{
                            return <li> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                        })}
                    </ul>
                </div>
                </div>}
        </div>
    }
}