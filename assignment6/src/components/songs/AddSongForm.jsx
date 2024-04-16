import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form";
import React, { useState } from 'react'; 
import { addSong } from "./queries";
import { useParams } from "react-router-dom";
import { getAlbumById, getSongByAlbumId } from "../album/queries";

export const AddSongForm =()=>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    const [addSongMutation, { data, loading, error }] = useMutation(addSong, {refetchQueries:[getAlbumById,getSongByAlbumId]});
    const [errorText, setErrorText] = useState('');
    const {id:AlbumId} = useParams();
    const resetForm =(e)=>{
            if(e){
                e.preventDefault();
            }
            reset();
      }

    const handleSongAdd = (formData)=>{   
        const {title, duration } = formData;
        addSongMutation({variables:{title: title, duration:duration ,albumId: AlbumId}})
        resetForm();

    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleSongAdd)}>
                <label htmlFor="title">Title: </label> 
                <input 
                    type="title" 
                    id="name"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add title"
                    {...register("title", {
                        required: "Title is Required",
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

                <label htmlFor="duration">Duration: </label> 
                <input 
                    type="text" 
                    id="duration"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add duration"
                    {...register("duration", {
                        required: "Duration is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "Duration can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.duration && <p className="text-orange-600" >{errors.duration.message}</p>}
                <br></br>
                <div className="flex flex-row justify-evenly mt-3">

                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit">Add!</button>
                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit" onClick={resetForm}>Clear!</button>
                </div>
                {error && <p>{error.message}</p>}
                {data &&<p>Successfully added!</p>}
          </form>
        </div>
    )

}

