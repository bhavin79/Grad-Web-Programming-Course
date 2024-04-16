import { ObjectId } from "mongodb";
import { GraphQLError} from 'graphql';

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
        throw `${parameter} can must be greater than or equal to ${min}`;
      }
    }
    if (max != null) {
      if (num > max) {
        throw `${parameter} can must be less than or equal to ${max}`;
      }
    }
    return num;
  };


const validDate = (date, param)=>{
    date = validString(date, param);
    date = date.split("/");
    if(date.length!= 3){
        throw  `Invalid date format`;
    }
    
    // Month;
    validNumber(Number(date[0]),"month", 1, 12);

    //day
    validNumber(Number(date[1]),"day", 1, 31);

    //year
    validNumber(Number(date[2], "year", 0, 2024));
    
    const format = `${date[0]}/${date[1]}/${date[2]}`
    let inputDate = new Date(format)
    if(Number(inputDate.getDate()) != Number(date[1]) || 
        Number(inputDate.getMonth())+1 != Number(date[0]) ||
        Number(inputDate.getFullYear()) != Number(date[2])){
            throw 'Invalid Date'
      }
    

    const currentDate = new Date();

    if(inputDate>currentDate){
        throw `Date can't be in future`;
    }

    return inputDate;
}

const validDateScalar = (date, param = "Date")=>{
  date = validString(date, param);
  let finalDate= date;
  date = date.split("/");
  if(date.length!= 3){
      throw new GraphQLError("Invalid date format", {
        extensions: {
          code: 'BAD_USER_INPUT',
         },
    }) 
  }
  
  // Month;
  try {
    validNumber(Number(date[0]),"month", 1, 12);
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: 'BAD_USER_INPUT',
       },
  }) 
  }

  //day
  try {
    validNumber(Number(date[1]),"day", 1, 31);
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: 'BAD_USER_INPUT',
       },
    }) 
  }

  //year
  try {
    validNumber(Number(date[2], "year", 0, 2024));
  } catch (error) {
    throw new GraphQLError(error, {
      extensions: {
        code: 'BAD_USER_INPUT',
       },
    }) 
  }
  
  const format = `${date[0]}/${date[1]}/${date[2]}`
  let inputDate = new Date(format)
  if(Number(inputDate.getDate()) != Number(date[1]) || 
      Number(inputDate.getMonth())+1 != Number(date[0]) ||
      Number(inputDate.getFullYear()) != Number(date[2])){
          throw new GraphQLError("Invalid Date", {
            extensions: {
              code: 'BAD_USER_INPUT',
             },
          }) 
    }
  const currentDate = new Date();

  if(inputDate>currentDate){
      throw `Date can't be in future`;
  }

  return finalDate;
}


const validArrayOfStrings = (array, parameter = "input") => {
  if (!array || !Array.isArray(array)) throw `${parameter} is not an array`;
  const arr = [];
  const regex = /^[a-zA-Z\s]+$/;
  for (let i in array) {
    if (array[i] === undefined || !array[i] || typeof array[i] !== "string")
      throw `One or more elements in ${parameter} array is not a string`;
    array[i] = array[i].trim();
    if (array[i].length === 0)
      throw `One or more elements in ${parameter} array is an empty string`;
    
    if(!regex.test(array[i])){
        throw  `Each element in ${parameter} array must be only letters (A-Z all cases)`;
    }
    arr.push(array[i]);
  }
  if (arr.length === 0) throw `${parameter} is an empty array`;
  return arr;
};

const dateFormat = (date)=>{
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

const validDuration = (duration)=>{
  duration = validString(duration, "duration");  
  
  const dur = duration.split(":");
    if(dur.length!=2){
        throw `Invalid Date format. MM:SS is required; eg 03:10`
    }
    
    if(dur[0].length != 2 || dur[1].length !=2){
      throw `Invalid Date format. MM:SS is required; eg 03:10`

    }

    validNumber(Number(dur[0]), "minutes",0, 60);
    validNumber(Number(dur[1]), "seconds",0, 60);

  return duration;
}

const validGenre = (genre)=>{
  const genreSet = new Set([ "POP",
    "ROCK",
    "HIP_HOP",
    "COUNTRY",
    "JAZZ",
    "CLASSICAL",
    "ELECTRONIC",
    "R_AND_B",
    "INDIE",
    "ALTERNATIVE"]);
  genre = validString(genre, "genre");
  let upperGenre = genre.toUpperCase();
  if(!genreSet.has(upperGenre)){
    throw `Invalid genre`;
  }
  return genre.toLowerCase();
}
const validations ={validString, validNumber, validObjectId, validDate, validArrayOfStrings, dateFormat, validDuration, validGenre, validDateScalar};
export default validations;