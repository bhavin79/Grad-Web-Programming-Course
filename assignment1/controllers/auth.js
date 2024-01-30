import { users } from "../config/mongoCollection.js"
import { addUser, checkIfUserExists } from "../data/auth.js";
import validations from "../utils/validation.js"
import hash from "../utils/encryption.js"

export const register = async(req, res)=>{    
    let {name, username, password} = req.body;
    //Input validation
    try {
        name = validations.validString(name,"name");
        username = validations.validString(username, "username");
    } catch (error) {
        return res.status(200).json(error);
    }

    try {
        password = validations.validPassword(password);  
    } catch (error) {
        return res.status(400).json({error: error, banner: 
            "Password length should be a minimum of 8 character with atleast one upercase, atleast one number, atleast one special character, and no spaces"})
    }
    //TODO: check if user is already logged in: maybe in middleware;

    //check if user exists
    try {
        if(await checkIfUserExists(username)){
            return res.status(400).json({error:"Username already exists"});
        };
    } catch (error) {
        return res.status(400).json(error);
    }

    //add user to collection;
    let registerUser = undefined
    try {
        registerUser = await addUser({name, username, password});
    } catch (error) {
        return res.status(400).json(error);
    }

    return res.status(200).json(registerUser);

}

export const signUp = async(req, res)=>{
    let {username, password} = req.body;
    username = validations.validString(username, "username");
    password = validations.validString(password, "password");
    let userData = undefined;
    try {
        userData = await checkIfUserExists(username);
        if(userData == null){
            res.status(401).json({error: "Either passowrd or username is incorrect"});
        }
    } catch (error) {
        res.status(400).json(error);
    }
    const check = await hash.compareHash(password, userData.password)
    if(check) {
        delete userData.password;
        userData._id = userData._id.toString();
        req.session.user = {
            id: userData._id,
            username: userData.username
           };
        return res.status(200).json(userData);
    }
    else{
        return res.status(401).json({error: "Either passowrd or username is incorrect"})
    }
}  

export const logout = async(req, res)=>{
    console.log(req.session.user);

}


