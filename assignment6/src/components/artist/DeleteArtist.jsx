import { useMutation } from "@apollo/client";
import { deleteArtist } from "./queries";

export const DeleteArtistForm =(props)=>{
    const [deleteArtistMutation, { data, loading, error }] = useMutation(deleteArtist);
    
    const handleDelete = ()=>{
        deleteArtistMutation({variables:{id: props.data.id}});
    }

    return (<div>
        <h1>You sure you want to delete, <span className="text-orange-500">{props.data.name}</span>?</h1>
        <div>
        <button className="btn bg-orange-200 hover:bg-orange-500" onClick={handleDelete}>Delete!</button>
        </div>
        {loading && <p>deleting..</p>}
        {data && <p>Successfully delete! Refresh the page to see changes</p>}
        {error && <p>{error.message}</p>}
    </div>)
}