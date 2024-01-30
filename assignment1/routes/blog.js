import { Router } from "express";
import {getAllBlogs, getBlogById, addBlog, putBlogById, patchBlogById, addComments, deleteComment} from "../controllers/blog.js"
import { register, signUp, logout } from "../controllers/auth.js";
const router = Router();

router.route('/').get(getAllBlogs).post(addBlog);
router.route('/:id').get(getBlogById).put(putBlogById).patch(patchBlogById);
router.route('/:id/comments').post(addComments);
router.route('/:blogId/:commentId').delete(deleteComment);
router.route("/register").post(register);
router.route("/signin").post(signUp);
router.route("/logout").get(logout);



export default router;
