import { ObjectId } from "mongodb";

const validString = (string, parameter = "input", maxLength = null) => {
    if (string === undefined || !string || typeof string !== "string")
      throw `${parameter} does not exist or is not a string`;
  
    string = string.trim();
    if (string.length == 0)
      throw `${parameter} cannot be an empty string or just spaces`;
  
    if (maxLength) {
      if (string.length > maxLength) {
        throw `${parameter} can be only ${maxLength} character long`;
      }
    }
    return string;
  };

  const validObjectId = (id, parameter = "input") => {
    id = validString(id, parameter);
    if (!ObjectId.isValid(id)) throw `Valid ObjectId required for ${parameter}`;
    return id;
  };

  
  const validNumber = (num, parameter = "input", min = null, max = null) => {
    console.log(num, min);
    if (typeof num == "undefined") {
      throw `${parameter} should be provided`;
    }
    if (typeof num != "number") {
      throw ` number is needed but "${typeof num}" was provided for ${parameter}`;
    }
    if (Number.isNaN(num)) {
      throw `Valid number required for ${parameter}`;
    }
    if (min != null) {

      if (num < min) {
        throw `${parameter} can must be greater than ${min}`;
      }
    }
    if (max != null) {
      if (num > max) {
        throw `${parameter} can must be less than ${max}`;
      }
    }
    return num;
  };

  const validPassword = (pass) => {
    pass = validString(pass, "password", 15);
    if (pass.length < 8) {
      throw `Password length should be a minimum of 8`;
    }
    let upperCase = /.*[A-Z].*/g;
    let oneNumber = /.*[0-9].*/g;
    let oneSpecial = /[^a-zA-Z0-9\s]/g;
    let whiteSpace = /.*[\s].*/g;
    if (pass.match(whiteSpace)) {
      throw `Password should not contain any spaces`;
    }
    if (!pass.match(upperCase)) {
      throw `Password should have atleast one upercase character`;
    }
    if (!pass.match(oneNumber)) {
      throw `Password should have atleast one number`;
    }
    if (!pass.match(oneSpecial)) {
      throw `Password should have atleast one special character`;
    }
    return pass;
  };


  const validations ={validString, validNumber, validObjectId, validPassword};

  export default validations;