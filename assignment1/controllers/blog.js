import { allBlogs, getSingleBlog, postComment, putBlog, updateBlog, addBlog , removeComment} from "../data/blog.js";
import validations from "../utils/validation.js";

export const getAllBlogs = async (req, res)=>{   
    try {
        const result = await allBlogs(req.query);    
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
   
}

export const getBlogById = async(req, res)=>{
    let id = req.params;
    try {
        id = validations.validObjectId(id, "blog id");
    } catch (error) {
        return res.status(400).json(error);
    }
    
    try {
        const result = await getSingleBlog(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
    // console.log(req.session.user);      
}

export const postBlog = async (req, res)=>{
    let {blogTitle, blogBody} = req.body;
    try {
        blogBody = validations.validString(blogBody, "blogBody");
        blogTitle = validations.validString(blogTitle, "blogTitle");
    } catch (error) {
        return res.status(400).json(error);
    }
    const {id: userId, username} = req.session.user;
    console.log(username);
    try {
       const result = await addBlog({blogBody, blogTitle, userId, username});
       return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export const putBlogById = async (req, res)=>{
    let {blogBody, blogTitle} = req.body;
    let {id: blogId} = req.params;
    let {id: userId, username} = req.session.user;
    try {
        blogBody = validations.validString(blogBody, "blogBody");
        blogTitle = validations.validString(blogTitle, "blogTitle");
        userId = validations.validObjectId(userId, "userId");
        blogId = validations.validString(blogId, "blog Id");
        username = validations.validString(username, "username");
    } catch (error) {
        return res.status(400).json(error);
    }
    try {
        const result = await putBlog({blogTitle, blogBody, userId, blogId, username});
        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
}


export const patchBlogById =async (req, res)=>{
    let {id: blogId} = req.params;
    let {blogTitle, blogBody} = req.body;
    let {id: userId} = req.session.user;
    if(!blogTitle && !blogBody){
        return res.status(400).json("Please provide blogBody and / or blogTitle");
    }

    if(blogTitle){
        try {
            blogTitle = validations.validString(blogTitle, "blogTitle");
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    if(blogBody){
        try {
            blogBody = validations.validString(blogBody, "blogBody");
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    try {
        const originalBlog = await getSingleBlog(blogId);
        if(originalBlog.userThatPosted._id.toString() != userId){
            return res.status(401).json({error: 'You are not the owner of this blog post'});
        }
        const result = await updateBlog({blogTitle, blogBody, blogId});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
}


export const addComments = async (req, res)=>{
    let {id:blogId} = req.params;
    let {id: userId, username} = req.session.user;
    let {comment} = req.body;

    try { 
        userId = validations.validObjectId(userId, "user ID");
        blogId = validations.validObjectId(blogId, "blog ID");
        comment = validations.validString(comment, "comment");
        username = validations.validString(username, "username");
    } catch (error) {
        return res.status(400).json(error);
    }
    
    try {
        const result = await postComment({blogId, comment, userId, username});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }

}


export const deleteComment = async (req, res)=>{
    let {blogId, commentId} = req.params;
    let {id:userId} = req.session.user;
    try { 
        blogId = validations.validObjectId(blogId, "blog Id")
        userId = validations.validObjectId(userId, "user Id")
        commentId = validations.validObjectId(commentId, "comment Id")
    } catch (error) {
        return res.status(400).json(error);
    }

    try {
        const result = await removeComment({blogId, userId, commentId});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
}


