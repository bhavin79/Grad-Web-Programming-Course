import { rocketsCache, capsuleCache, capsulesCache, launcheCache, launchesCache, rocketCache } from "../middlewares/caching.js";
import spaceXRoutes from "./spaceX.js";

const constructorMethod = (app) => { 
    app.use("/api/rockets/",rocketsCache);
    app.use("/api/launches/",launchesCache);
    app.use("/api/capsules/",capsulesCache);
    app.use("/api/rockets/:id",rocketCache);
    app.use("/api/launches/:id",launcheCache);
    app.use("/api/capsules/:id",capsuleCache);
    app.use("/api", spaceXRoutes) 
    app.use("*", (req, res) => {
      return res.status(404).json({ msg: "Not Found" });
    });
  };
  
  export default constructorMethod;