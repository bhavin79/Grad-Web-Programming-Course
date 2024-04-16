import { useLazyQuery } from "@apollo/client"
import { getAlbumsByGenre } from "./queries";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
const MusicGenre =  {
    POP: "POP",
    ROCK: "ROCK",
    HIP_HOP: "HIP_HOP",
    COUNTRY: "COUNTRY",
    JAZZ:"JAZZ" ,
    CLASSICAL: "CLASSICAL",
    ELECTRONIC:"ELECTRONIC",
    R_AND_B: "R_AND_B",
    INDIE: "INDIE",
    ALTERNATIVE: "ALTERNATIVE",
  }

const Genres = ({data, error, loading})=>{
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
        return (
        <div className="grid grid-cols-3 gap-8 mx-36 mt-10">
            {data.albumsByGenre && data.albumsByGenre.map(({title, genre, artist, recordCompany, id, releaseDate})=>{
                return <div className="card w-96 bg-zinc-100 shadow-lg">
                   <div className="card-body">
                    <p>Title: <Link to={`/albums/${id}`}>{title}</Link></p>
                    <p>Genre: {genre}</p>
                    <p>Artist:<Link to ={`/artists/${artist.id}`}> {artist.name}</Link></p>
                    <p>Record Company: <Link to ={`/companies/${recordCompany.id}`}>{recordCompany.name}</Link></p>
                    <p>Release Date: {releaseDate}</p>
                    </div>
                </div>
            })}
        </div>
        
        );
    }

}

export const GenreForm =()=>{

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    const [customInputError, setCustomInputError] = useState("");

    const [getGenre, {data, loading, error}]= useLazyQuery(getAlbumsByGenre,{fetchPolicy: 'cache-and-network'})
      


    const handleGenreSearch = (formData)=>{
        console.log(formData.searchTerm);
        let genre = formData.searchTerm.toUpperCase();
        genre = genre.trim();
        
        switch(genre){
            case "POP":{
                getGenre({variables:{genre: MusicGenre.POP}})
                break;
            }
            case "ROCK":{
                getGenre({variables:{genre: MusicGenre.ROCK}})
                break;
            }
            case "HIP_HOP":{
                getGenre({variables:{genre: MusicGenre.HIP_HOP}})
                break;
            }
            case "COUNTRY":{
                getGenre({variables:{genre: MusicGenre.COUNTRY}})
                break;
            }
            case "JAZZ":{
                getGenre({variables:{genre: MusicGenre.JAZZ}})
                break;
            }
            case "CLASSICAL":{
                getGenre({variables:{genre: MusicGenre.CLASSICAL}})
                break;
            }
            case "ELECTRONIC":{
                getGenre({variables:{genre: MusicGenre.ELECTRONIC}})
                break;
            }

            case "R_AND_B":{
                getGenre({variables:{genre: MusicGenre.R_AND_B}})
                break;
            }
            case "INDIE":{
                getGenre({variables:{genre: MusicGenre.INDIE}})
                break;
            }
            case "ALTERNATIVE":{
                getGenre({variables:{genre: MusicGenre.ALTERNATIVE}})
                break;
            }
            default:{
                setCustomInputError("Genre can be only: POP, ROCK, HIP_HOP,COUNTRY, JAZZ,CLASSICAL, ELECTRONIC, R_AND_B, INDIE, ALTERNATIVE ")
                return;           
            }
        }
        setCustomInputError("");

    }

    return(
        <div>
        <div className="flex flex-row flex-wrap mt-10 justify-center">
            <form onSubmit={handleSubmit(handleGenreSearch)}>
                <input placeholder="Genre" type={"text"} className="input input-bordered"  {...register("searchTerm", {required: "Search Term is required", validate:{
                    isEmpty: (searchTerm)=> searchTerm.trim().length>0 || "This cant be just empty spaces"
                }})}></input>
                <button type="submit" className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900">Search</button>

                {errors.searchTerm && (
                    <p className="errorMsg">{errors.searchTerm.message }</p>
                )}
                <p>{customInputError}</p>

          </form>
          </div>
          <div className="flex flex-col" >
            <Genres data={data} error={error} loading={loading}/>
          </div>

        </div>
    )

}