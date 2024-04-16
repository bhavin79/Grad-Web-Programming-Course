import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getArtist, getSongsByArtist } from "./queries"
import { EditArtist } from "./EditArtist";
import { DeleteArtistForm } from "./DeleteArtist";
import { MyModal } from "../common/modal";
export const Artist = ()=>{
    
    const artistId = useParams().id
    const {loading, data, error} = useQuery(getArtist, {
        variables:{id:useParams().id},
        fetchPolicy: 'cache-and-network'
    });
    const { data:songData, error:songError} = useQuery(getSongsByArtist, {
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
        const {getArtistById:artist} = data;
        let songs;
        let albums;
        if(songData){
            songs = songData.getSongsByArtistId;
        }
        if(artist.albums.length>0){
            albums = artist.albums;
        }

        return <div className="flex justify-center items-center h-screen">
            {artist&& <div className="flex flex-col">
             <p>Name: {artist.name}</p>
             <span> Date Formed: {artist.dateFormed}</span>

                        <div>
                            Members: 
                            <ul>  
                                {artist.members.map((member)=><li>{member} </li>)}
                            </ul>
                            </div>
                        <span> Number Of Albums: {artist.numOfAlbums}</span>
                {songs&& <div>
                    Songs: 
                        <ul>
                            {songs.map((song)=>{
                                return <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link> - ({song.duration})</li>

                            })}
                        </ul>
                    </div>}
                   {albums&& <div>
                    Albums: 
                        <ul>
                            {artist.albums.map((album)=>{
                                return <li> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                            })}
                        </ul>
                    </div>}
                </div>}
                <MyModal CustomForm={EditArtist} modalName={`${artistId}-edit`} buttonName="Edit" data={{name:artist.name, id:artistId, members:artist.members, dateFormed:artist.dateFormed}}  />
                <MyModal CustomForm={DeleteArtistForm} modalName={`${artistId}-del`} buttonName="Remove" data={{name:artist.name, id:artistId }}/>
        </div>
    }
}