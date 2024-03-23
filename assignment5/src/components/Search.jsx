import { useState } from "react"

export const Search = ()=> {
    const [serachText, setSearchText] = useState("");
    
    return <>
        <input type="textbox" className="SearchBar" placeholder="Search"/>
    </>    
}