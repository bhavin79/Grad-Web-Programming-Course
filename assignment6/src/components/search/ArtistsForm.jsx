import { useState } from "react";
import { useLazyQuery } from "@apollo/client"
import { getArtistByName, getAlbumsByGenre } from "./queries";
import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Artist = ({data, error, loading})=>{
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        console.log(error);
        return <div className="flex justify-center mt-10 text-xl">
        <p>{error.message}</p>
    </div>
    }
    if(data){
        const {searchArtistByArtistName:artists} = data;
        return  <div className="grid grid-cols-3 gap-8 mx-36 mt-10">
        { artists && artists.map(({id, name, members, numOfAlbums})=>{
            return <div className="card w-96 bg-zinc-100 shadow-lg">
                 <div className="card-body">
                   <p>Name: <Link to={`/artists/${id}`}>{name}</Link> </p>
                    <div>
                        Members: 
                        <ul>  
                            {members.map((member)=><li>{member} </li>)}
                        </ul>
                        </div>
                    <span> Number Of Albums: {numOfAlbums}</span>
                </div>
            </div>
        })}
    </div>
    }
}

export const ArtistForm =()=>{
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    const [getArtist, {data, loading, error}]= useLazyQuery(getArtistByName,{fetchPolicy: 'cache-and-network'})
    
    const handleArtistSearch = (formData)=>{
        console.log(formData.serachTerm);
        getArtist({variables:{searchTerm: formData.serachTerm}});
    }

    return(
        <div>
            <div className="flex flex-row flex-wrap mt-10 justify-center">
                <form onSubmit={handleSubmit(handleArtistSearch)}>
                    <input placeholder="Artist Name" type={"text"} className="input input-bordered" {...register("serachTerm", {required: "Search Term is required", validate:{
                        isEmpty: (searchTerm)=> searchTerm.trim().length>0 || "This cant be just empty spaces"
                    }})}></input>
                    {errors.serachTerm && (
                        <p className="errorMsg">{errors.serachTerm.message }</p>
                    )}
                    <button type="submit" className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900">Search</button>
            </form>
            </div>
          <div className="flex flex-col" >
                <Artist data={data} error={error} loading={loading}/>
          </div>
       
        </div>

    )

}