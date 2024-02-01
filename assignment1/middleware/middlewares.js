import { getSingleBlog } from "../data/blog.js";

export const sitblogMiddlware = async(req, res, next)=>{
    if((req.method === "GET" && req.path != "/logout") || req.path === "/register"){
        return next();
    }

    if(req.path === "/signin"){
        if(req.session.user){
            return res.status(400).json("You are already logged in");
        }else{
            return next();
        }
    }

    if(req.method === "PUT" || req.method === "PATCH" ){
        if(!req.session.user){
            return res.status(403).json("Please log in");
        }
        let {id: paramId} = req.params;
        let id = undefined;
        if (typeof paramId == "undefined"){
            id = req.path.slice(1);
        }
        else{
            id = paramId;
        }
        try {
            let blog = await getSingleBlog(id);
            if(blog.userThatPosted._id.toString()===req.session.user.id){

                return next();
            }
            else{
                return res.status(401).json("you are not authorized");
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    next()
}



export const commentMiddleware = async(req, res, next)=>{
    if(!req.session.user){
        return res.status(401).json(`please log in from second`);
    }
    let {commentId, blogId } = req.params;
    try {
        const blog = await getSingleBlog(blogId);
        const comments = blog.comments;
        for(let i =0; i<comments.length; i++){
            if(comments[i]._id.toString() === commentId){
                if(comments[i].userThatPostedComment._id.toString() == req.session.user.id){
                    return next();
                }else{
                    return res.status(401).json("You are not the original poster");
                }
            }
        }
        return res.status(404).json(`Comment Id does not exist`);
    } catch (error) {
        return res.status(400).json(error);

    }
    next();
}


