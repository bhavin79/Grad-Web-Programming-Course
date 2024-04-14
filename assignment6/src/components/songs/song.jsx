import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { MyModal } from "../common/modal";
import { DeleteSongForm } from "./DeleteSongForm";
import { EditSongForm } from "./EditSong";
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
        return <h1>{error.message}</h1>
    }
    if(data){
        const {getSongById:song} = data;

        return <div className="flex justify-center items-center h-screen">
            {song&& <div className="flex flex-col">
             <p>Title: {song.title}</p>
             <p>Album: <Link to= {`/albums/${song.albumId.id}`}>{song.albumId.title}</Link></p>
             <p>Artist: <Link to= {`/artists/${song.albumId.artist.id}`}>{song.albumId.artist.name}</Link></p>
             <p>Duration: {song.duration}</p>
             
             <MyModal CustomForm={EditSongForm} modalName={`${song.id}-edit`} buttonName="Edit" data={{id:song.id, albumId: song.albumId.id, duration: song.duration, title: song.title}}/>
             <MyModal CustomForm={DeleteSongForm} modalName={`${song.id}-del`} buttonName="Remove" data={{id:song.id, name: song.title}}/>
   
                </div>}
        </div>
    }
}

//TODO: Not Found pages. 