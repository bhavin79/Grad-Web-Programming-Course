import express from "express";
import session from "express-session";
import configRoutes from "./routes/index.js";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "AuthCookie",
    secret: "ThefamousSecretOfWebPrograming#$",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 6000000 },
  })
);
configRoutes(app);


const start = async () => {
    try {
      app.listen(port, ()=>{
        console.log("Server is listening on port 4000 localhost");
      });
    } catch (error) {
      console.log(error);
    }
  };
  start(); 

