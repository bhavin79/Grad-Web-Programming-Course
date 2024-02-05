import spaceXRoutes from "./spaceX.js";

const constructorMethod = (app) => { 
    app.use("/api", spaceXRoutes) 
    app.use("*", (req, res) => {
      return res.status(404).json({ msg: "Not Found" });
    });
  };
  
  export default constructorMethod;