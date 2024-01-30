import { allBlogs } from "../data/blog.js";

export const getAllBlogs = async (req, res)=>{
    const result = await allBlogs();
   
    return res.status(200).send({msg: result});

}

export const getBlogById = (req, res)=>{
    console.log(req.session.user);
    return res.send("hello there");
}

export const addBlog = (req, res)=>{}

export const putBlogById = (req, res)=>{}


export const patchBlogById = (req, res)=>{}


export const addComments = (req, res)=>{}


export const deleteComment = (req, res)=>{}


