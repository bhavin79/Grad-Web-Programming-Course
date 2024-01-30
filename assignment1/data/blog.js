import { blogs } from "../config/mongoCollection.js"

export const allBlogs = async()=>{
    const blogCollection = await blogs();
    return await blogCollection.find({}).toArray();
}

