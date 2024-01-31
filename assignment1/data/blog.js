import { ObjectId } from "mongodb";
import { blogs } from "../config/mongoCollection.js"
import validations from "../utils/validation.js";

export const allBlogs = async()=>{
    let {skip, limit} = req.query;
    if(skip){
        skip = validations.validString(skip, "skip");
        skip = Number(skip);
        skip = validations.validNumber(skip, "skip",0);
    }else{
        skip =0;
    }
    if(limit){
        limit = validations.validString(limit, "limit");
        limit = Number(limit);
        limit = validations.validNumber(limit, "limit",0, 100);
    }else{
        limit = 20
    }
    const blogCollection = await blogs();
    return await blogCollection.find({}).skip(skip).limit(limit).toArray();

    //TODO: verify;
    // TODO: _id to string
}

export const getSingleBlog = async(id)=>{
    id = validations.validObjectId(id, "Blog ID");
    const blogCollection = await blogs();
    let result = await blogCollection.findOne({_id: new ObjectId(id)});
    if (result == null){
        throw "blog does not exist";
    }
    //TODO: format output;
}

export const addBlog = async ({blogTitle, blogBody, userId, username})=>{    
    blogBody = validations.validString(blogBody, "blogBody");
    blogTitle = validations.validString(blogTitle, "blogTitle");
    userId = validations.validObjectId(userId, "user id");
    username = validations.validString(username, "username");


    const userThatPosted = {
        _id: new ObjectId(userId),
        username: username,
    }   

    const blogCollection = await blogs();    
    const result = await blogCollection.insertOne({blogTitle, blogBody, userThatPosted, "comments": []});
    if (!result.acknowledged || !result.insertedId) throw 'Could not add blog';
    
    //TODOL: format output;
}

export const putBlog = async({blogTitle, blogBody, userId, blogId, username})=>{
    blogBody = validations.validString(blogBody, "blogBody");
    blogTitle = validations.validString(blogTitle, "blogTitle");
    userId = validations.validObjectId(userId, "userId");
    blogId = validations.validString(blogId, "blog Id");
    username = validations.validString(username, "username");

    let blog = await getSingleBlog(blogId);
    let result = undefined;
    if(blog.userThatPosted._id.toString === userId){
        const blogCollection = await blogs();
        result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$set: {blogTitle, blogBody}}, {returnDocument: 'after'});
        if (!result.value){
            throw `Could not PUT blog`;
        }
    }
    else{
        throw `you are not author`
    }
    return result;

    //TODO: format output;
}

export const updateBlog =async(data)=>{
    let {blogTitle, blogBody,  blogId} = data;
    let updateBlog = {};
    if(blogTitle){
        blogTitle = validations.validString(blogTitle, "blogTitle");
        updateBlog.blogTitle = blogTitle;
    }
    if(blogBody){
        blogBody = validations.validString(blogBody, "blogBody");
        updateBlog.blogBody = blogBody;
    }

    blogId = validations.validObjectId(blogId, "blog ID");

    const blogCollection = await blogs();
    const result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, updateBlog, {returnDocument: 'after'});
    if(!result.value){
        throw `Could not PATCH blog`;
    }
    return result;
    // TODO: format result;
}

export const postComment = async(userId, blogId, comment, username)=>{
    userId = validations.validObjectId(userId, "user ID");
    blogId = validations.validObjectId(blogId, "blog ID");
    comment = validations.validString(comment, "comment");
    username = validations.validString(username, "username");

    const commentDocument = {
        _id: new ObjectId(),
        userThatPostedComment: {_id: new ObjectId(userId), username}
    }

    const blogCollection = await blogs();

    let result = blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$push: {comments: commentDocument}}, {returnDocument: 'after'});
    if(!result.value){
        throw `Could not add comment`;
    }
    return result;

    // TODO: format result;
}

export const removeComment = async(blogId, userId, commentId)=>{
    blogId = validations.validObjectId(blogId, "blog Id")
    userId = validations.validObjectId(userId, "user Id")
    commentId = validations.validObjectId(commentId, "comment Id")

    const blogCollection = await blogs();
    let result = await blogCollection.findOne({_id: new ObjectId(blogId)}).toArray();
    if(result.comments.length == 0){
        throw `No comments found`;
    }

    let comments = result.comments;
    for(let i = 0; i<comments.length; i++){
        if(comments[i]._id == commentId){
            if(commentId[i].userThatPostedComment._id == userId){
                let ans = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$pull :{comments: {_id: new ObjectId(commentId)}}}, {returnDocument:'after'});
                return ans;
            }
        }
    }

    throw `You are not authorized`;
}