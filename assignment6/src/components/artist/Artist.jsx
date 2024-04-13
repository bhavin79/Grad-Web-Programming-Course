import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getArtist, getSongsByArtist } from "./queries"

export const Artist = ()=>{
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
        return <h1>{error.message}</h1>
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
                                return <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link></li>
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
        </div>
    }
}