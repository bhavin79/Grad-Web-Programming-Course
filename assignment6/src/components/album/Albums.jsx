import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { getAlbums } from "./queries"
export const Albums = ()=>{
    const {loading, data, error} = useQuery(getAlbums, {
        fetchPolicy: 'cache-and-network'
    });
    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        console.log(error);
        return <h1>{error.message}</h1>
    }
    if(data){
        return (
            <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                {data.albums && data.albums.map(({title, genre, artist, recordCompany, id})=>{
                    return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                        <Link to={`/albums/${id}`}> title: {title}</Link>
                        <span>genre: {genre}</span>
                        <span> artist: {artist.name}</span>
                        <span>record company: {recordCompany.name}</span>

                        <div className="flex flex-row justify-around">
                            <button className="border border-black py-0.2 px-1 rounded-md m-1">edit</button>
                            <button className="border border-black py-0.2 px-1 rounded-md m-1">remove</button>
                        </div>
                    </div>
                })}
            </div>
        
            );
    }

   
}