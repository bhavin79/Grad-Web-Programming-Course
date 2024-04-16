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
        return <div className="flex justify-center mt-10 text-xl">
        <p>Not Found</p>
    </div>
    }
    if(data){
        console.log(data.recordCompanies[0])
        
        return (
            <div className="flex flex-col flex-wrap">
                <span className="self-center text-3xl mt-10">
                    Record Companies!
                </span>
                <span className="self-end mr-10">
                <MyModal CustomForm={AddCompanyForm} modalName="addCompany-modal" buttonName="Add"/>
                </span>
                <div className="grid grid-cols-3 gap-8 mx-36 mt-10">
                    {data.recordCompanies && data.recordCompanies.map(({id, name, country, numOfAlbums, foundedYear})=>{
                        return <div className="card w-96 bg-zinc-100 shadow-lg">
                            <div className="card-body">

                            <Link to={`/companies/${id}`}> Name: {name}</Link>
                            <span> Number Of Albums: {numOfAlbums}</span>
                            <span>Country: {country}</span>
                            <div className="flex flex-row justify-around">
                            <MyModal CustomForm={EditCompanyForm} modalName={`${id}-edit`} data = {{id, name, country, foundedYear}} buttonName="Edit"/>
                            <MyModal CustomForm={DeleteCompanyForm} modalName={`${id}-del`} data = {{id, name}} buttonName="Remove"/>
                            </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            );
    }
}