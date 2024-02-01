import { ObjectId } from "mongodb";
import { blogs } from "../config/mongoCollection.js"
import validations from "../utils/validation.js";
import { ObjectIdToString } from "../utils/helper.js";
export const allBlogs = async(query)=>{
    let {skip, limit} = query;
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
    console.log(skip, limit);
    const blogCollection = await blogs(); 
    let result = await blogCollection.find({}).skip(skip).limit(limit).toArray();
    console.log("result",result);
    result =  result.map((doc)=>{
        return ObjectIdToString(doc);
    })
    return result;
}

export const getSingleBlog = async(id)=>{
    id = validations.validObjectId(id, "Blog ID");
    const blogCollection = await blogs();
    let result = await blogCollection.findOne({_id: new ObjectId(id)});
    if (result == null){
        throw "blog does not exist";
    }
    return result;
}

export const addBlog = async ({blogTitle, blogBody, userId, username})=>{    
    console.log("i am here");
    console.log(blogTitle, blogBody, userId, username);

    blogBody = validations.validString(blogBody, "blogBody");
    blogTitle = validations.validString(blogTitle, "blogTitle");
    userId = validations.validObjectId(userId, "user id");
    username = validations.validString(username, "username");

    const userThatPosted = {
        _id: new ObjectId(userId),
        username: username,
    }   

    const blogCollection = await blogs();    
    const result = await blogCollection.insertOne({blogTitle, blogBody, userThatPosted, "comments": []}, {returnDocument: 'after'});
    if (!result.acknowledged || !result.insertedId) throw 'Could not add blog';

    let theBlog = await getSingleBlog(result.insertedId.toString());
    theBlog = ObjectIdToString(theBlog);

    console.log(theBlog);
    return theBlog;
}

export const putBlog = async({blogTitle, blogBody, userId, blogId, username})=>{
    blogBody = validations.validString(blogBody, "blogBody");
    blogTitle = validations.validString(blogTitle, "blogTitle");
    userId = validations.validObjectId(userId, "userId");
    blogId = validations.validString(blogId, "blog Id");
    username = validations.validString(username, "username");
   
    let result = undefined;
    const blogCollection = await blogs();
    result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$set: {blogTitle, blogBody}}, {returnDocument: 'after'});
    if (result == null){
        throw `Could not PUT blog. Maybe check the blog Id`;
    }
    result = ObjectIdToString(result);
    return result;
}

export const updateBlog =async({blogTitle, blogBody,  blogId})=>{

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
    console.log(updateBlog);
    const blogCollection = await blogs();
    let result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$set: updateBlog}, {returnDocument: 'after'});
    if(result == null){
        throw `Could not PATCH blog`;
    }
    
    result = ObjectIdToString(result);
    return result;
}

export const postComment = async({userId, blogId, comment, username})=>{
    userId = validations.validObjectId(userId, "user ID");
    blogId = validations.validObjectId(blogId, "blog ID");
    comment = validations.validString(comment, "comment");
    username = validations.validString(username, "username");

    const commentDocument = {
        _id: new ObjectId(),
        userThatPostedComment: {_id: new ObjectId(userId), username},
        comment
    }

    const blogCollection = await blogs();

    let result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$push: {comments: commentDocument}}, {returnDocument: 'after'});
    if(result == null){
        throw `Could not add comment`;
    }
    result = ObjectIdToString(result);
    return result;

}

export const removeComment = async({blogId, userId, commentId})=>{
    console.log(blogId, userId, commentId);

    blogId = validations.validObjectId(blogId, "blog Id")
    userId = validations.validObjectId(userId, "user Id")
    commentId = validations.validObjectId(commentId, "comment Id")
    const blogCollection = await blogs();
    let result = await blogCollection.findOneAndUpdate({_id: new ObjectId(blogId)}, {$pull :{comments: {_id: new ObjectId(commentId)}}});
    console.log(result);
    if(result == null){
        throw `Could not delete comment`;
    }
    return `comment ${commentId} is deleted`;
}

