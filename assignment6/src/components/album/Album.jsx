import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getAlbumById } from "./queries"

export const Album = ()=>{
    const {loading, data, error} = useQuery(getAlbumById, {
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
        let album = data.getAlbumById;
        return <div className="flex justify-center items-center h-screen">
            {data&& <div className="flex flex-col">
                <p>Aritst Name:<Link to={`/artist/${album.artist.id}`}> {album.artist.name} </Link></p>
                <p>Album Title:{album.title}</p>
                <p>Release Date: {album.releaseDate}</p>
                <p>Record Company: <Link to = {`/companies/${album.recordCompany.id}`}> {album.recordCompany.name} </Link></p>
                <p>Genre: {album.genre}</p>
                <div>
                    Songs: 
                        <ul>
                            {album.songs.map((song)=>{
                                console.log(song)
                                return <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>}
        </div>
    }
}