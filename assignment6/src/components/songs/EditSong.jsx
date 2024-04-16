import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form";
import React, { useState } from 'react'; 
import { editSong, getSong } from "./queries";
import { getAlbumById, getSongByAlbumId } from "../album/queries";



export const EditSongForm =({data:defaultData})=>{

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    const [editSongMutation, { data, loading, error }] = useMutation(editSong, {refetchQueries:[getAlbumById,getSongByAlbumId]});
    const [errorText, setErrorText] = useState('');

    const resetForm =(e)=>{
            if(e){
                e.preventDefault();
            }
            reset();
      }

    const handleSongAdd = (formData)=>{   

        const {title, duration, albumId } = formData;

        editSongMutation({variables:{id: defaultData.id,title: title, duration:duration ,albumId: albumId}})
        
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
                    defaultValue={defaultData.title}
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
                    defaultValue={defaultData.duration}
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
                
                <label htmlFor="albumId">AlbumId: </label> 
                <input 
                    type="text" 
                    id="albumId"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add albumId"
                    defaultValue={defaultData.albumId}
                    {...register("albumId", {
                        required: "AlbumId is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "AlbumId can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.albumId && <p className="text-orange-600" >{errors.albumId.message}</p>}
                <br></br>
                <div className="flex flex-row justify-evenly mt-3">
                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit">Edit!</button>
                <button className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900" type="submit" onClick={resetForm}>Clear!</button>
                
                </div>
                {error && <p>{error.message}</p>}
                {data &&<p>Successfully added!</p>}
          </form>
        </div>
    )

}

