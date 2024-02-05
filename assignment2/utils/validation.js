export const validString = (string, parameter = "input", maxLength = null) => {
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

