import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getAlbumById, getSongByAlbumId } from "./queries"
import {MyModal} from "../common/modal"
import { AddSongForm } from "../songs/AddSongForm";
import { DeleteSongForm } from "../songs/DeleteSongForm";
import { EditAlbumForm } from "./EditAlbumForm";
import { DeleteAlbumForm } from "./DeleteAlbumForm";

export const Album = ()=>{
    
    const albumId =useParams().id;
    const {loading, data, error} = useQuery(getAlbumById, {
        variables:{id:useParams().id},
        fetchPolicy: 'cache-and-network'
    });
    const {loading:songLoading, data:songData, error:songError} = useQuery(getSongByAlbumId, {
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
                            {songData&& songData.getSongsByAlbumId.map((song)=>{
                                return <div>
                                    <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link> - ({song.duration})</li>
                                    <MyModal CustomForm={DeleteSongForm} modalName={`${song.id}-del`} buttonName="Remove" data={{id: song.id, name: song.title}} />
                                </div>
                            })}
                        </ul>
                    </div>
                </div>}
                <MyModal CustomForm={EditAlbumForm} buttonName="Edit" 
                data={{title: album.title, genre: album.genre, artist:{name: album.artist.name, id:album.artist.id },
recordCompany:{name: album.recordCompany.name, id:album.recordCompany.id}, id: albumId, releaseDate: album.releaseDate}} modalName={`${albumId}-edit`}/>
                
                <MyModal CustomForm={DeleteAlbumForm} buttonName="Remove" data={{title: album.title, artist:{name: album.artist.name, id:album.artist.id },  id:albumId }} modalName={`${albumId}-del`}/>

        </div>
        </div>

    }
}