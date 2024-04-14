import { useMutation } from "@apollo/client";
import { removeAlbum, getAlbums } from "./queries";

export const DeleteAlbumForm =(props)=>{
    const [deleteAlbumMutation, { data, loading, error }] = useMutation(removeAlbum, {refetchQueries:[getAlbums]});
    
    const handleDelete = ()=>{
        deleteAlbumMutation({variables:{id: props.data.id}});
    }

    return (<div>
        <h1>Are you sure you want to delete <span className="text-orange-500">{props.data.title}</span> by {props.data.artist.name}?</h1>
        <div>
        <button className="btn bg-orange-200 hover:bg-orange-500" onClick={handleDelete}>Delete!</button>
        </div>
        {loading && <p>deleting..</p>}
        {data && <p>Successfully delete! Refresh the page to see changes</p>}
        {error && <p>{error.message}</p>}
    </div>)
}