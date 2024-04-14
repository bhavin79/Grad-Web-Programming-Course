import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form";
import React, { useState } from 'react'; 
import { addAlbum, getAlbums } from "./queries";

const getGenre =(genre)=>{
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
    
    switch(genre){
        case "POP":{
            return MusicGenre.POP;
        }
        case "ROCK":{
            return  MusicGenre.ROCK;
        }
        case "HIP_HOP":{
            return  MusicGenre.HIP_HOP;

        }
        case "COUNTRY":{
            return  MusicGenre.COUNTRY;

        }
        case "JAZZ":{
            return  MusicGenre.JAZZ;

        }
        case "CLASSICAL":{
            return  MusicGenre.CLASSICAL;

        }
        case "ELECTRONIC":{
            return  MusicGenre.ELECTRONIC;

        }

        case "R_AND_B":{
            return  MusicGenre.R_AND_B;

        }
        case "INDIE":{
            return  MusicGenre.INDIE;

        }
        case "ALTERNATIVE":{
            return  MusicGenre.ALTERNATIVE;
            
        }

    }
  }
  

export const AddAlbumForm =()=>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    const [addAlbumMutation, { data, loading, error }] = useMutation(addAlbum, {refetchQueries:[getAlbums]});
    const [selectedGenre, setSelectedGenre]= useState("");
    const [errorText, setErrorText] = useState('');

    // title: $title, releaseDate: $releaseDate, genre: $genre, artistId: $artistId, companyId: $companyId
    //TODO: Validation in Add Artist;
    const [genre] = useState([ "", "POP", "ROCK", "HIP_HOP", "COUNTRY", "JAZZ" , "CLASSICAL", "ELECTRONIC", "R_AND_B", "INDIE", "ALTERNATIVE",]) 
     const resetForm =(e)=>{
            if(e){
                e.preventDefault();
            }
            reset();

      }

    const handleAlbumAdd = (formData)=>{   
        let formateDate = formData.date;
        formateDate = formateDate.split("-");
        formateDate = `${formateDate[1]}/${formateDate[2]}/${formateDate[0]}`;
        const {title, date, ArtistId, CompId } = formData;
        console.log(title, date, ArtistId, CompId );
        if(selectedGenre==""){
            setErrorText("Please Select Genre")
            return;        
        }
        addAlbumMutation({variables:{title: title, releaseDate: formateDate, genre:getGenre(selectedGenre), artistId: ArtistId, companyId:CompId}})
        // resetForm();
    }

    const handleGenreChange =(e)=>{
        setSelectedGenre(e.target.value);
    }

    console.log(selectedGenre);
    return(
        <div>
            <form onSubmit={handleSubmit(handleAlbumAdd)}>
                <label htmlFor="title">Title: </label> 
                <input 
                    type="text" 
                    id="title"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Title"
                    {...register("title", {
                        required: "Name is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "Title can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.title && <p className="text-orange-600" >{errors.title.message}</p>}
                <br></br>
                <label htmlFor="genre">Genre: </label>
                 <select className="select select-bordered my-2 py-0 w-full max-w-xs" value={selectedGenre} onChange={handleGenreChange}>
                    {genre && genre.map((gen)=>{
                        if(gen == ""){
                            return <option value={gen}>Not Selected</option>
                        }
                        return <option value={gen}>{gen}</option>
                    })};
                    </select>
                   {errorText&& <p>{errorText}</p> }
                <br/>
                <label htmlFor="ArtistId">ArtistId: </label> 
                <input 
                    type="text" 
                    id="ArtistId"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Artist id"
                    {...register("ArtistId", {
                        required: "ArtistId is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "ArtistId can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.ArtistId && <p className="text-orange-600" >{errors.ArtistId.message}</p>}
                <br></br>
                <label htmlFor="CompId">Record Company Id: </label> 
                <input 
                    type="text" 
                    id="CompId"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Record Company Id"
                    {...register("CompId", {
                        required: "Record Company Id is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "Record Company Id can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.CompId && <p className="text-orange-600" >{errors.CompId.message}</p>}
                <br></br>
             <label htmlFor="date">Release Date: </label>
                    <input 
                    type="date"
                    {...register("date",{ 
                        required: "Please Select a date",
                        validate:{
                            noFuture: (date)=>{
                                let inputDate = new Date(date);
                                let currDate = new Date();
                                if(inputDate>currDate){
                                    return "Date cant be in future";
                                }
                            }
                        }
                    }
                    )}></input>
                    {errors && errors.date && <p className="text-orange-600" >{errors.date.message}</p>}
                <br/>
                <button className="btn my-2 py-0" type="submit">Add!</button>
                <button className="btn my-2 py-0" type="submit" onClick={resetForm}>Clear!</button>

                {error && <p>{error.message}</p>}
                {data &&<p>Successfully added</p>}
          </form>
        </div>
    )

}

