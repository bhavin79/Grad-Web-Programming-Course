import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { MyModal } from "../common/modal";
import { AddArtist } from "./AddArtist";
import { deleteArtist, getArtits } from "./queries"
import { EditArtist} from "./EditArtist";
import { useState } from "react";
import { useMutation } from "@apollo/client"
import { DeleteArtistForm } from "./DeleteArtist";

export const Artists = ()=>{
    const [reload, setReload] = useState(0);
    const {loading, data, error} = useQuery(getArtits, {
        fetchPolicy: 'cache-and-network'
    });


    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>{error.message}</h1>
    }
    if(data){
        return (
            <div> 
            <MyModal CustomForm={AddArtist} buttonName="Add" data="default" modalName="AddArtistModal" setReload = {setReload} reload={reload}/>
            <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                {data.artists && data.artists.map(({id, name, members, numOfAlbums, dateFormed})=>{
                    return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                        <Link to={`/artists/${id}`}> Name: {name}</Link>
                        <div>
                            Members: 
                            <ul>  
                                {members.map((member)=><li>{member} </li>)}
                            </ul>
                            </div>
                        <span> Number Of Albums: {numOfAlbums}</span>
                        <span> Date Formed: {dateFormed}</span>

                        <div className="flex flex-row justify-around">
                            <MyModal CustomForm={EditArtist} modalName={`${id}-edit`} buttonName="Edit" data={{name, id, members, dateFormed}} setReload = {setReload} reload={reload} />
                            <MyModal CustomForm={DeleteArtistForm} modalName={`${id}-del`} buttonName="Remove" data={{name, id, }} setReload = {setReload} reload={reload} />
                        </div>
                    </div>
                })}
            </div>
        </div>
            );
    }
}