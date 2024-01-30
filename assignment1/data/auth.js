import { users } from "../config/mongoCollection.js";
import validations from "../utils/validation.js";
import hash from "../utils/encryption.js";
import { ObjectId } from "mongodb";

export const checkIfUserExists = async(username)=>{
    username = validations.validString(username, "username");
    const userCollection = await users();
    const user = await userCollection.findOne({"username":username });
    return user;
  
};

export const addUser = async(data)=>{
    let {name, username, password} = data;
    name = validations.validString(name, "name");
    username = validations.validString(username, "username");
    password = validations.validPassword(password);
    password = await hash.generateHash(password);
    const userCollection = await users();

    let  result = await userCollection.insertOne({name, username, password}); 
    if (!result.acknowledged || !result.insertedId) throw 'Could not add user';

    return await getUser(result.insertedId);
}

export const getUser = async(id)=>{
    id = id.toString();
    id = validations.validObjectId(id, "user");    
    const userCollection = await users();
    const user = await userCollection.findOne({_id: new ObjectId(id) });
    if(user){
        delete user.password;
        user._id = user._id.toString();
        return user;
    }
    throw 'User not found';
}

