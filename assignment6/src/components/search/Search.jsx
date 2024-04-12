import { useState } from "react";
import { useLazyQuery } from "@apollo/client"
import { getArtistByName, getAlbumsByGenre } from "./queries";
import { ArtistForm } from "./ArtistsForm";
import { CompaniesForm } from "./CompanyForm";
import { GenreForm } from "./GenreForm";

export const Search = ()=>{
    const [selectedOption, setSelectedOption] = useState({Genre:true, CompanyFoundYear: false, Artist:false});
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");

    const [getArtist, {data:artistData, loading:artistLoading, error:artistError}]= useLazyQuery(getArtistByName,{fetchPolicy: 'cache-and-network'})
    const [getAlbums, {data:albumData, loading:albumLoading, error:albumError}]= useLazyQuery(getAlbumsByGenre,{fetchPolicy: 'cache-and-network'})

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
        }
    }

    const handleSearchDropDown= (e)=>{
        const val = e.target.name;
        console.log(e.target);
        const newSelectState = {
            Genre:false, 
            CompanyFoundYear: false, 
            Artist:false
        }
        console.log(val)
        setSelectedOption({
            ...newSelectState,
            [val]: true
        })        
    }

    const handleSearch = ()=>{
        if(selectedOption.Artist){
            getArtist({variables:{searchTerm: artist}})
        }
        if(selectedOption.Genre){
            //TODO: Make it dynamic
            getAlbums({variables:{genre: MusicGenre.INDIE}})
        }
    }

    console.log(selectedOption);

    return <div className="flex flex-col items-center h-screen">
        <div role="tablist" className="tabs tabs-lifted">
            <a role="tab" className={`tab ${getTabStyle("Genre")}`} name='Genre' onClick={handleSearchDropDown}>Genre</a>
            <a role="tab" className={`tab ${getTabStyle("CompanyFoundYear")}`} name='CompanyFoundYear' onClick={handleSearchDropDown}>Company Found year</a>
            <a role="tab" className={`tab ${getTabStyle("Artist")}`} name='Artist' onClick={handleSearchDropDown} >Artist</a>
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


    </div>
}

