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
import { Song } from './components/songs/song'

function App() {
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/albums/:id' element={<Album/>}/>
      <Route path='/albums' element={<Albums/>}/>

      <Route path='/artist/:id' element={<Artist/>}/>
      <Route path='/artists' element={<Artists/>}/>

      <Route path='/companies/:id' element={<RecordCompany/>}/>
      <Route path='/companies' element={<RecordCompanies/>}/>

      <Route path='/search' element={<Search/>}/>  

      <Route path='/songs/:id' element={<Song/>}/>
    </Routes>
    </> 
  )
}

export default App
