
import blog from "./blog.js";


const constructorMethod = (app) => {  
    app.use("/sitblog", blog);
    app.use("*", (req, res) => {
      return res.status(404).json({ msg: "Not Found" });
    });
  };
  
  export default constructorMethod;