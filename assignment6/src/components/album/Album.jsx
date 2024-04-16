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
        return <div className="flex flex-col mx-20 my-10">
            <div className="flex flex-col">
            {data&& <div className="flex flex-col">
            <p className="text-5xl">{album.title}  <Link className="text-3xl" to={`/artists/${album.artist.id}`}>- by {album.artist.name} </Link></p>
                <p>{album.releaseDate}</p>

                <div className="my-10">
                <p>Record Company: <Link to = {`/companies/${album.recordCompany.id}`}> {album.recordCompany.name} </Link></p>
                <p>Genre: {album.genre}</p>
                </div>

                <div>
                    Songs: 
                        <ul>
                            {songData&& songData.getSongsByAlbumId.map((song)=>{
                                return <div>
                                    <li className="flex flex-row  my-2 py-1 px-2 rounded-md w-1/4"> <Link to = {`/songs/${song.id}`}>{song.title}</Link> - ({song.duration})  
                                    <span className="ml-8"><MyModal CustomForm={DeleteSongForm} modalName={`${song.id}-del`} buttonName="X" data={{id: song.id, name: song.title}} />
                                        </span></li> 
                                </div>
                            })}
                        </ul>
                    </div>
                </div>}
                <div className="flex flex-row justify-end mr-20">

                <div className="mx-7">
                 <MyModal CustomForm={AddSongForm} buttonName="Add new song!" modalName="addSong-modal"/>

                </div>
                <div>

                <MyModal CustomForm={EditAlbumForm} buttonName="Edit" 
                data={{title: album.title, genre: album.genre, artist:{name: album.artist.name, id:album.artist.id },
recordCompany:{name: album.recordCompany.name, id:album.recordCompany.id}, id: albumId, releaseDate: album.releaseDate}} modalName={`${albumId}-edit`}/>
                </div>

                <div className="mx-7">
                <MyModal CustomForm={DeleteAlbumForm} buttonName="Remove" data={{title: album.title, artist:{name: album.artist.name, id:album.artist.id },  id:albumId }} modalName={`${albumId}-del`}/>
                </div>
            </div>
        </div>
        </div>

    }
}