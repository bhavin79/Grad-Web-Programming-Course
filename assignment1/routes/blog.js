import { Router } from "express";
import {getAllBlogs, getBlogById, addBlog, putBlogById, patchBlogById, addComments, deleteComment} from "../controllers/blog.js"
const router = Router();

router.route('/').get(getAllBlogs).post(addBlog);
router.route('/:id').get(getBlogById).put(putBlogById).patch(patchBlogById);
router.route('/:id/comments').post(addComments);
router.route('/:blogId/:commentId').delete(deleteComment);
router.route("/register").post();
router.route("/signin").post();
router.route("/logout").get();



export default router;
