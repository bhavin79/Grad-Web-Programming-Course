import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { getAlbums } from "./queries"
import {MyModal} from "../common/modal"
import { AddAlbumForm } from "./AddAlbumForm";
import { EditAlbumForm } from "./EditAlbumForm";
import { DeleteAlbumForm } from "./DeleteAlbumForm";

export const Albums = ()=>{
    const {loading, data, error} = useQuery(getAlbums, {
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
        return (
            <div>
            <MyModal CustomForm={AddAlbumForm} buttonName="Add" modalName="addAlbum-Modal"/>
            <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                {data.albums && data.albums.map(({title, genre, artist, recordCompany, id, releaseDate})=>{
                    return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                        <Link to={`/albums/${id}`}> title: {title}</Link>
                        <span>genre: {genre}</span>
                        <span> artist: {artist.name}</span>
                        <span>record company: {recordCompany.name}</span>

                        <div className="flex flex-row justify-around">
                        <MyModal CustomForm={EditAlbumForm} buttonName="Edit" data={{title, genre, artist, recordCompany, id, releaseDate }} modalName={`${id}-edit`}/>
                        <MyModal CustomForm={DeleteAlbumForm} buttonName="Remove" data={{title, artist,  id }} modalName={`${id}-del`}/>
                        </div>
                    </div>
                })}
            </div>
            </div>
        );
    }

   
}