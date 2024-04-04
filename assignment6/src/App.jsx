import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Album } from './components/album/Album'
import { Albums } from './components/album/Albums'
import { Artist } from './components/artist/Artist'
import { Artists } from './components/artist/Artists'
import { NavBar } from './components/NavBar'
import { RecordCompanies } from './components/recordCompanies/RecordCompanies'
import { RecordCompany } from './components/recordCompanies/RecordCompany'
import { Search } from './components/search/Search'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/albums/id' element={<Album/>}/>
      <Route path='/albums' element={<Albums/>}/>

      <Route path='/artist/id' element={<Artist/>}/>
      <Route path='/artists' element={<Artists/>}/>

      <Route path='/companies' element={<RecordCompanies/>}/>
      <Route path='/companies/id' element={<RecordCompany/>}/>

      <Route path='/search' element={<Search/>}/>  

    </Routes>
    </> 
  )
}

export default App
