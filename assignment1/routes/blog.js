import { Router } from "express";
import {getAllBlogs, getBlogById, postBlog, putBlogById, patchBlogById, addComments, deleteComment} from "../controllers/blog.js"
import { register, signUp, logout } from "../controllers/auth.js";
const router = Router();

router.route('/' ).get(getAllBlogs).post(postBlog);
router.route("/logout").get(logout);
router.route("/register").post(register);
router.route("/signin").post(signUp);
router.route('/:id').get(getBlogById).put(putBlogById).patch(patchBlogById);
router.route('/:id/comments').post(addComments);
router.route('/:blogId/:commentId').delete(deleteComment);



export default router;
