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
        return <div className="flex justify-center mt-10 text-xl">
            <p>{error.message}</p>
        </div>
        
    }
    if(data){
        console.log(data);
        const {searchSongByTitle:song} = data;

        return <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
            {data&& data.searchSongByTitle.map((song)=>{
                return <div className="card w-96 bg-zinc-100 shadow-lg">
                <div className="card-body">
                    <p>Title: <Link to={`/songs/${song.id}`}>{song.title}</Link></p>
                    <p>Album: <Link to= {`/albums/${song.albumId.id}`}>{song.albumId.title}</Link></p>
                    <p>Artist: <Link to= {`/artists/${song.albumId.artist.id}`}>{song.albumId.artist.name}</Link></p>
                </div>
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
            <div className="flex flex-row flex-wrap mt-10 justify-center">
            <form onSubmit={handleSubmit(handleSongSearch)}>
                <input type={"text"}  
                className="input input-bordered"
                placeholder="Song"
                {...register("serachTerm", 
                {required: "Search Term is required", 
                validate:{
                    isEmpty: (searchTerm)=> searchTerm.trim().length>0 || "This cant be just empty spaces"
                }})}></input>
                <button type="submit" className="btn bg-gray-800 text-gray-50 py-1 px-5 ml-3 hover:bg-gray-900">Search</button>
                {errors.serachTerm && (
                    <p className="errorMsg">{errors.serachTerm.message }</p>
                )}
          </form>
          </div>
          <div className="flex flex-col" >
            <Song data={data} error={error} loading={loading}/>
          </div>


        </div>
    )

}