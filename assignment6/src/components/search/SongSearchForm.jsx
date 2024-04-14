import {  useLazyQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import {  getSongsByTitle } from "./queries"
import { useForm } from "react-hook-form";

const Song = ({loading, data, error})=>{

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        console.log(error);
        return <h1>{error.message}</h1>
    }
    if(data){
        console.log(data);
        const {searchSongByTitle:song} = data;

        return <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
            {data&& data.searchSongByTitle.map((song)=>{
                return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                    <p>Title: {song.title}</p>
                    <p>Album: <Link to= {`/albums/${song.albumId.id}`}>{song.albumId.title}</Link></p>
                    <p>Artist: <Link to= {`/artists/${song.albumId.artist.id}`}>{song.albumId.artist.name}</Link></p>
                </div>
            }) }
        </div>
        
        
    }
}

//TODO: Not Found pages. 
export const SongSearchForm =()=>{
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    const [getSong, {data, loading, error}]= useLazyQuery(getSongsByTitle,{fetchPolicy: 'cache-and-network'})
    
    const handleSongSearch = (formData)=>{
        getSong({variables:{searchTitleTerm: formData.serachTerm}});
    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleSongSearch)}>
                <input type={"text"}  
                className= "border border-gray-300 p-1 rounded" 
                {...register("serachTerm", 
                {required: "Search Term is required", 
                validate:{
                    isEmpty: (searchTerm)=> searchTerm.trim().length>0 || "This cant be just empty spaces"
                }})}></input>
                {errors.serachTerm && (
                    <p className="errorMsg">{errors.serachTerm.message }</p>
                )}
                <button type="submit">Search</button>
          </form>
          <Song data={data} error={error} loading={loading}/>
        </div>
    )

}