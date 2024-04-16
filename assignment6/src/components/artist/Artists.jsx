import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { MyModal } from "../common/modal";
import { AddArtist } from "./AddArtist";
import { getArtits } from "./queries"
import { EditArtist} from "./EditArtist";
import { DeleteArtistForm } from "./DeleteArtist";

export const Artists = ()=>{

    const {loading, data, error} = useQuery(getArtits, {
        fetchPolicy: 'cache-and-network'
    });

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <div className="flex justify-center mt-10 text-xl">
        <p>Not Found</p>
    </div>
    }
    if(data){
        return (
            <div className="flex flex-col flex-wrap"> 
            <span className="self-center text-3xl mt-10">Artists!</span>
            <span className="self-end mr-10">
                <MyModal CustomForm={AddArtist} buttonName="Add"  data="default" modalName="AddArtistModal"/>
            </span>
            <div className="grid grid-cols-3 gap-8 mx-36 mt-10">
                {data.artists && data.artists.map(({id, name, members, numOfAlbums, dateFormed})=>{
                    return <div className="card w-96 bg-zinc-100 shadow-lg">
                       <div className="card-body">
                        <Link to={`/artists/${id}`}> Name: {name}</Link>
                        <div className="flex flex-row flex-wrap">
                           Members:{members.map((member)=><span className=" mx-2 py-1 px-2 rounded-3xl bg-white shadow-md text-green-800" >{member}</span>)}
                            </div>
                        <span> Number Of Albums: {numOfAlbums}</span>

                        <div className="flex flex-row justify-around">
                            <MyModal CustomForm={EditArtist} modalName={`${id}-edit`} buttonName="Edit" data={{name, id, members, dateFormed}}  />
                            <MyModal CustomForm={DeleteArtistForm} modalName={`${id}-del`} buttonName="Remove" data={{name, id, }}/>
                        </div>
                    </div>
                    </div>
                })}
            </div>
        </div>
            );
    }
}