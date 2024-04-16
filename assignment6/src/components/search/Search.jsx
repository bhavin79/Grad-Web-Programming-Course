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
    return <div className="flex flex-col flex-wrap">
        <span className="self-center text-3xl mt-5">Search!</span>

        <div role="tablist" className="tabs tabs-lifted mt-3">
            {tabsList.map((tabVal)=>{
                 return  <a role="tab" className={`tab ${getTabStyle(tabVal)}`} name={tabVal} onClick={handleSearchDropDown}>{tabVal}</a>
            })}

        </div>
    {selectedOption.Genre &&
         <div>
            <GenreForm/>
        </div>
    }
    {selectedOption.CompanyFoundYear && <div>
        <CompaniesForm/>
        </div>}

    {selectedOption.Artist && <div>
        <ArtistForm/>
     </div>}

     {selectedOption.Song &&<div>
        <SongSearchForm/>
     </div> }

    </div>
}

