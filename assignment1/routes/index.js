
import blog from "./blog.js";
import { commentMiddleware, sitblogMiddlware } from "../middleware/middlewares.js";


const constructorMethod = (app) => {  
    app.use("/sitblog",sitblogMiddlware)
    app.use("/sitblog/:id/comment", commentMiddleware)
    app.use("/sitblog/:blogId/:commentId", commentMiddleware)
    app.use("/sitblog", blog);
    app.use("*", (req, res) => {
      return res.status(404).json({ msg: "Not Found" });
    });
  };
  
  export default constructorMethod;