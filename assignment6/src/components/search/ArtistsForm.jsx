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
        return <h1>{error.message}</h1>
    }
    if(data){
        const {searchArtistByArtistName:artists} = data;
        console.log(artists, "Here");
        return <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
        { artists && artists.map(({id, name, members, numOfAlbums})=>{
            return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                <Link to={`/artists/${id}`}> Name: {name}</Link>
                <div>
                    Members: 
                    <ul>  
                        {members.map((member)=><li>{member} </li>)}
                    </ul>
                    </div>
                <span> Number Of Albums: {numOfAlbums}</span>
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
            <form onSubmit={handleSubmit(handleArtistSearch)}>
                <input type={"text"} {...register("serachTerm", {required: "Search Term is required", validate:{
                    isEmpty: (searchTerm)=> searchTerm.trim().length>0 || "This cant be just empty spaces"
                }})}></input>
                {errors.serachTerm && (
                    <p className="errorMsg">{errors.serachTerm.message }</p>
                )}
                <button type="submit">Search</button>
          </form>
          <Artist data={data} error={error} loading={loading}/>
        </div>
    )

}