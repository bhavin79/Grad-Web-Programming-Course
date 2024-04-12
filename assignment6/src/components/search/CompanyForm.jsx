import { useState } from "react";
import { useLazyQuery } from "@apollo/client"
import { getCompanies } from "./queries";
import { Form, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Companies = ({data, error, loading})=>{
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>{error.message}</h1>
    }
    if(data){        
        return (
            <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                {data.companyByFoundedYear && data.companyByFoundedYear.map(({id, name, country, numOfAlbums})=>{
                    return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                        <Link to={`/companies/${id}`}> Name: {name}</Link>
                        <span> Number Of Albums: {numOfAlbums}</span>
                        <span>Country: {country}</span>
                    </div>
                })}
            </div>
        
            );
    }
}

export const CompaniesForm =()=>{
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    const [customInputError, setCustomInputError] = useState("");

    const [getComps, {data, loading, error}]= useLazyQuery(getCompanies,{fetchPolicy: 'cache-and-network'})
    
    const handleArtistSearch = (formData)=>{
        console.log(formData.serachTerm);
        let localMin = Number(formData.minYear);
        let localMax = Number(formData.maxYear);
        if(localMin>localMax){
            setCustomInputError("Max year can't be before min year");
            return;
        }
        else{
            setCustomInputError("");
        }
        localMin = localMin == 0?1900:localMin;

        const variable = {min:localMin, max:localMax}

        getComps({variables: variable});
    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleArtistSearch)}>
                <label htmlFor="minYear">Min year: </label>
                <input type={"number"} id="minYear" placeholder="Min Year" {...register("minYear", {validate:{
                    min: (minYear)=> {   
                        if(minYear.trim().length == 0){
                            return true;
                        }
                        minYear = Number(minYear);
                        return minYear>=1900 || "This cant be before 1900"}
                }})}></input>
                <label htmlFor="maxYear">Max year: </label>
                <input type={"number"} id= "maxYear"placeholder="Max Year" {...register("maxYear", {validate:{
                    max: (maxYear)=> {   
                        if(maxYear.trim().length == 0){
                            return "Max Year must be provided";
                        }
                        maxYear = Number(maxYear);

                        return maxYear>=1900 || "Max year cant be before 1900"}
                }})}></input>
                {errors.minYear && (
                    <p className="errorMsg">{errors.minYear.message }</p>
                )}
                 {errors.maxYear && (
                    <p className="errorMsg">{errors.maxYear.message }</p>
                )}
                <p>
                    {customInputError}
                </p>
                <button type="submit">Search</button>
          </form>

          <Companies data={data} error={error} loading={loading}/>
        </div>
    )

}