import { useState } from "react";
import { ArtistForm } from "./ArtistsForm";
import { CompaniesForm } from "./CompanyForm";
import { GenreForm } from "./GenreForm";
import { SongSearchForm } from "./SongSearchForm";

export const Search = ()=>{
    const [selectedOption, setSelectedOption] = useState({Genre:true, CompanyFoundYear: false, Artist:false, Song:false});
    
    const getTabStyle =(name)=>{
        switch(name){
            case "Genre":{
                if(selectedOption.Genre){
                    return `tab-active`
                }
                break;
            }
            case "CompanyFoundYear":{
                if(selectedOption.CompanyFoundYear){
                    return `tab-active`
                }
                break;
            }
            case "Artist":{
                if(selectedOption.Artist){
                    return `tab-active`
                }
                break;
            }
            case "Song":{
                if(selectedOption.Song){
                    return `tab-active`
                }
                break;
            }
        }
    }

    const handleSearchDropDown= (e)=>{
        const val = e.target.name;
        console.log(e.target);
        const newSelectState = {
            Genre:false, 
            CompanyFoundYear: false, 
            Artist:false,
            Song:false,
        }
        console.log(val)
        setSelectedOption({
            ...newSelectState,
            [val]: true
        })        
    }


    console.log(selectedOption);
    const tabsList = ["Genre", "CompanyFoundYear", "Artist", "Song"]
    return <div className="flex flex-col items-center h-screen">
        <div role="tablist" className="tabs tabs-lifted">
            {tabsList.map((tabVal)=>{
                 return  <a role="tab" className={`tab ${getTabStyle(tabVal)}`} name={tabVal} onClick={handleSearchDropDown}>{tabVal}</a>
            })}

        </div>
    {selectedOption.Genre &&
         <div className="">
            <GenreForm/>
        </div>
    }
    {selectedOption.CompanyFoundYear && <div className="flex flex-row justify-center items-center h-screen">
        <CompaniesForm/>
        </div>}

    {selectedOption.Artist && <div className="flex justify-center flex-col items-center h-screen">
        <ArtistForm/>
     </div>}

     {selectedOption.Song &&<div className="flex justify-center flex-col items-center h-screen">
        <SongSearchForm/>
     </div> }

    </div>
}

