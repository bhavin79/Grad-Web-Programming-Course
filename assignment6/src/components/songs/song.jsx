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
        return <div className="flex justify-center mt-10 text-xl">
        <p>Not Found</p>
    </div>
    }
    if(data){
        const {getSongById:song} = data;

        return <div className="flex flex-col mx-20 my-10">
            {song&& <div className="flex flex-col">
             <p className="text-5xl"> {song.title}</p>
             <div className="my-10">

             <p>Album: <Link to= {`/albums/${song.albumId.id}`}>{song.albumId.title}</Link></p>
             <p>Artist: <Link to= {`/artists/${song.albumId.artist.id}`}>{song.albumId.artist.name}</Link></p>
             <p>Duration: {song.duration}</p>
             </div>
             <div className="flex flex-row justify-end mr-40">
             <div className="mx-7">
                <MyModal CustomForm={EditSongForm} modalName={`${song.id}-edit`} buttonName="Edit" data={{id:song.id, albumId: song.albumId.id, duration: song.duration, title: song.title}}/>
             </div>
             <div>

             <MyModal CustomForm={DeleteSongForm} modalName={`${song.id}-del`} buttonName="Remove" data={{id:song.id, name: song.title}}/>
            </div>
            </div>
        </div>}
        </div>
    }
}

//TODO: Not Found pages. 