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
        return <div className="flex justify-center mt-10 text-xl">
        <p>Not Found</p>
    </div>
    }
    
    if(data){
        return (
            <div className="flex flex-col flex-wrap">
            <div className="self-center text-3xl mt-10">Albums!</div>
            <span className="self-end mr-10">
                <MyModal CustomForm={AddAlbumForm} buttonName="Add" modalName="addAlbum-Modal"/>
            </span>
            <div className="grid grid-cols-3 gap-8 mx-36 mt-10">
                {data.albums && data.albums.map(({title, genre, artist, recordCompany, id, releaseDate})=>{
                    return <div className="card w-96 bg-zinc-100 shadow-lg">
                        <div className="card-body">
                        <Link  to={`/albums/${id}`}>Title: {title}</Link>
                        <span>genre: {genre}</span>
                        <span> artist: {artist.name}</span>
                        <span>record company: {recordCompany.name}</span>

                        <div className="flex flex-row justify-around">
                        <MyModal CustomForm={EditAlbumForm} buttonName="Edit" data={{title, genre, artist, recordCompany, id, releaseDate }} modalName={`${id}-edit`}/>
                        <MyModal CustomForm={DeleteAlbumForm} buttonName="Remove" data={{title, artist,  id }} modalName={`${id}-del`}/>
                        </div>
                        </div>
                    </div>
                })}
            </div>
            </div>
        );
    }

   
}