
export const ObjectIdToString = (result) =>{
    result._id = result._id.toString();
    result.userThatPosted._id = result.userThatPosted._id.toString();
    if(result.comments.length>0){
        result.comments.map((comment)=>{
            comment._id = comment._id.toString();
            comment.userThatPostedComment._id = comment.userThatPostedComment._id.toString();
            return comment;
        })
    }

    return result;
}