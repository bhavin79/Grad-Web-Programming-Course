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

        return <div className="flex flex-col mx-20 my-10">
            {artist&& <div className="flex flex-col">
             <p className="text-5xl">{artist.name}</p>
             <span> Date Formed: {artist.dateFormed}</span>
            <div>
                <span> Number Of Albums: {artist.numOfAlbums}</span>
             </div>

            <div className="my-10">
               <div className="font-bold"> Members:</div>
                    {artist.members.map((member)=><span className="mr-2 py-1 px-2 rounded-md bg-gray-300 ">{member} </span>)}
                </div>
                       
                {songs&& <div>
                    
                    <div className="font-bold">Songs:</div>
                        <ul>
                            {songs.map((song)=>{
                                return <li className="my-2 py-1 px-2 rounded-md bg-gray-300 w-1/4"> <Link to = {`/songs/${song.id}`}>{song.title}</Link> - ({song.duration})</li>

                            })}
                        </ul>
                    </div>}
                   {albums&& <div className="my-10" >
                    <div className="font-bold">Albums:</div>
                        <ul>
                            {artist.albums.map((album)=>{
                                return <li className="my-2 py-1 px-2 rounded-md bg-gray-300 w-1/4"> <Link to = {`/albums/${album.id}`}>{album.title}</Link></li>
                            })}
                        </ul>
                    </div>}
                </div>}
                <div className="flex flex-row justify-end mr-20 mt-4">
                    <div className="mx-7">
                      <MyModal CustomForm={EditArtist} modalName={`${artistId}-edit`} buttonName="Edit" data={{name:artist.name, id:artistId, members:artist.members, dateFormed:artist.dateFormed}}  />
                    </div>
                    <div>                   
                         <MyModal CustomForm={DeleteArtistForm} modalName={`${artistId}-del`} buttonName="Remove" data={{name:artist.name, id:artistId }}/>
                    </div>
                </div>
        </div>
    }
}