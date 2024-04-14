import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getAlbumById } from "./queries"
import {MyModal} from "../common/modal"
import { AddSongForm } from "../songs/AddSongForm";
import { EditSongForm } from "../songs/EditSong";
import { DeleteSongForm } from "../songs/DeleteSongForm";

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
        return <div> 
            <MyModal CustomForm={AddSongForm} buttonName="Add new song!" modalName="addSong-modal"/>
            <div className="flex justify-center items-center h-screen">
            {data&& <div className="flex flex-col">
                <p>Aritst Name:<Link to={`/artists/${album.artist.id}`}> {album.artist.name} </Link></p>
                <p>Album Title:{album.title}</p>
                <p>Release Date: {album.releaseDate}</p>
                <p>Record Company: <Link to = {`/companies/${album.recordCompany.id}`}> {album.recordCompany.name} </Link></p>
                <p>Genre: {album.genre}</p>
                <div>
                    Songs: 
                        <ul>
                            {album.songs.map((song)=>{
                                return <div>
                                    <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link></li>
                                    <MyModal CustomForm={DeleteSongForm} modalName={`${song.id}-del`} buttonName="Remove" data={{id: song.id, name: song.title}} />
                                </div>
                                
                            })}
                        </ul>
                    </div>
                </div>}
        </div>
        </div>

    }
}