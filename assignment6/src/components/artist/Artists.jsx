import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { MyModal } from "../common/modal";
import { AddArtist } from "./AddArtist";
import { getArtits } from "./queries"
export const Artists = ()=>{
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
            <MyModal CustomForm={AddArtist}/>
            <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                {data.artists && data.artists.map(({id, name, members, numOfAlbums})=>{
                    return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                        <Link to={`/artists/${id}`}> Name: {name}</Link>
                        <div>
                            Members: 
                            <ul>  
                                {members.map((member)=><li>{member} </li>)}
                            </ul>
                            </div>
                        <span> Number Of Albums: {numOfAlbums}</span>
                        <div className="flex flex-row justify-around">
                            <button className="border border-black py-0.2 px-1 rounded-md m-1">edit</button>
                            <button className="border border-black py-0.2 px-1 rounded-md m-1">remove</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
            );
    }
}