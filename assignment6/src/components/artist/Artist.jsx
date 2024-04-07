import { useQuery } from "@apollo/client"
import { useParams, Link } from "react-router-dom";
import { getArtist } from "./queries"

export const Artist = ()=>{
    const {loading, data, error} = useQuery(getArtist, {
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
        const {getSongsByArtistId:songs, getArtistById:artist} = data;

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
                <div>
                    Songs: 
                        <ul>
                            {songs.map((song)=>{
                                return <li> <Link to = {`/songs/${song.id}`}>{song.title}</Link></li>
                            })}
                        </ul>
                    </div>
                    <div>
                    Albums: 
                        <ul>
                            {artist.albums.map((album)=>{
                                return <li> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>}
        </div>
    }
}