import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getSong } from "./queries"

export const Song = ()=>{
    const {loading, data, error} = useQuery(getSong, {
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
        const {getSongById:song} = data;

        return <div className="flex justify-center items-center h-screen">
            {song&& <div className="flex flex-col">
             <p>Title: {song.title}</p>
             <p>Album: <Link to= {`/albums/${song.albumId.id}`}>{song.albumId.title}</Link></p>
             <p>Artist: <Link to= {`/artists/${song.albumId.artist.id}`}>{song.albumId.artist.name}</Link></p>
             <p>Duration: {song.duration}</p>
                </div>}
        </div>
    }
}

//TODO: Not Found pages. 