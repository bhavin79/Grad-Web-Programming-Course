import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { getAllCompanies } from "./queries"
import {MyModal} from "../common/modal"
import { AddCompanyForm } from "./AddCompany";
import { EditCompanyForm } from "./EditCompany";
import { DeleteCompanyForm } from "./DeleteCompanyForm";

export const RecordCompanies = ()=>{
    const {loading, data, error} = useQuery(getAllCompanies, {
        fetchPolicy: 'cache-and-network'
    });
    
    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        console.log(error);
        return <h1>Something went wrong</h1>
    }
    if(data){
        console.log(data.recordCompanies[0])
        
        return (
            <div>
                <MyModal CustomForm={AddCompanyForm} modalName="addCompany-modal" buttonName="Add"/>
                <div className="grid grid-cols-3 gap-4 mx-36 mt-10">
                    {data.recordCompanies && data.recordCompanies.map(({id, name, country, numOfAlbums, foundedYear})=>{
                        return <div className="flex flex-col flex-wrap border border-black rounded-md pl-2">
                            <Link to={`/companies/${id}`}> Name: {name}</Link>
                            <span> Number Of Albums: {numOfAlbums}</span>
                            <span>Country: {country}</span>
                            <div className="flex flex-row justify-around">
                            <MyModal CustomForm={EditCompanyForm} modalName={`${id}-edit`} data = {{id, name, country, foundedYear}} buttonName="Edit"/>
                            <MyModal CustomForm={DeleteCompanyForm} modalName={`${id}-del`} data = {{id, name}} buttonName="Remove"/>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            );
    }
}