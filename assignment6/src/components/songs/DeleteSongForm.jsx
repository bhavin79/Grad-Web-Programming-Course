import { useMutation } from "@apollo/client";
import { getAlbumById, getSongByAlbumId } from "../album/queries";
import { deleteSong } from "./queries";

export const DeleteSongForm =(props)=>{
    const [deleteSongMutation, { data, loading, error }] = useMutation(deleteSong, {refetchQueries:[getSongByAlbumId]});
    
    const handleDelete = ()=>{
        deleteSongMutation({variables:{id: props.data.id}});
    }

    return (<div>
        <h1>Are you sure you want to delete, <span className="text-orange-500">{props.data.name}</span>?</h1>
        <div>
        <button className="btn bg-orange-200 hover:bg-orange-500" onClick={handleDelete}>Delete!</button>
        </div>
        {loading && <p>deleting..</p>}
        {data && <p>Successfully delete! Refresh the page to see changes</p>}
        {error && <p>{error.message}</p>}
    </div>)
}