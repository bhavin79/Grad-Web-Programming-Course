import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form";
import React, { useState } from 'react'; 
import { addCompany } from "./queries";

export const AddCompanyForm =()=>{
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    const [addCompanyMutation, { data, loading, error }] = useMutation(addCompany);
    const [errorText, setErrorText] = useState('');

     const resetForm =(e)=>{
            if(e){
                e.preventDefault();
            }
            reset();
      }

    const handleCompanyAdd = (formData)=>{   

        const {name, foundedYear ,country } = formData;
        addCompanyMutation({variables:{name: name, foundedYear: Number(foundedYear), country: country}})
        resetForm();
    }
    console.log(errors?.foundedYear?.message)


    return(
        <div>
            <form onSubmit={handleSubmit(handleCompanyAdd)}>
                <label htmlFor="name">Name: </label> 
                <input 
                    type="text" 
                    id="name"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Name"
                    {...register("name", {
                        required: "Name is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "Name can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.name && <p className="text-orange-600" >{errors.name.message}</p>}
                <br></br>

                <label htmlFor="country">Country: </label> 
                <input 
                    type="text" 
                    id="country"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Country"
                    {...register("country", {
                        required: "Country is Required",
                        validate:{
                            justSpaces: (title)=>{
                                    if(title.trim().length==0){
                                        return "Country can't be empty spaces";
                                }
                            }
                        }
                    })}/>
                      {errors && errors.country && <p className="text-orange-600" >{errors.country.message}</p>}
                <br></br>
                <label htmlFor="foundedYear">Founded Year: </label> 
                <input 
                    type="number" 
                    id="foundedYear"
                    className= "border border-gray-300 p-1 rounded" 
                    placeholder="Add Founded Year"
                    defaultValue={2024}
                    {...register("foundedYear", {
                        required: "Founded Year is Required",
                        validate:{
                            yearValidation:(year)=>{
                                if(year<1900){
                                    return "Found Year can't be before 1900"
                                }
                                if(year>2024){
                                    return "Found Year can't be after 2024" 
                                }
                            }
                        }
                    })}/>
                      {errors && errors.foundedYear && <p className="text-orange-600" >{errors.foundedYear.message}</p>}

                <br></br>
             
                <button className="btn my-2 py-0" type="submit">Add!</button>
                <button className="btn my-2 py-0" type="submit" onClick={resetForm}>Clear!</button>

                {error && <p>{error.message}</p>}
                {data &&<p>Successfully added</p>}
          </form>
        </div>
    )

}

