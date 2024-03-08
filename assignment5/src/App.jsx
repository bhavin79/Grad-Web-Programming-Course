import { useState } from 'react'
import './App.css'
import {Link} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import { LaunchesPage } from './components/LaunchesPages';
import { PayloadsPage } from './components/PayloadsPage';
import {CoresPage} from "./components/CoresPage";
import { RocketsPage } from './components/RocketsPage';
import { ShipsPage } from './components/ShipsPage';
import { LaunchpadsPage } from './components/LaunchpadsPage';


function App() {

  return (
    <> 
    <div className='links'>
      <Link to='/launches/page/0'> Launches</Link><br/>
      <Link to='/payloads/page/0'> Payloads</Link><br/>
      <Link to='/cores/page/0'> Cores</Link><br/>
      <Link to='/rockets/page/0'> Rockets</Link><br/>
      <Link to='/launchpads/page/0'> Launch Pads</Link><br/>
    </div>
    <Routes>
          <Route path='/launches/page/:page' element={<LaunchesPage/>}/> 
          <Route path='/payloads/page/:page' element ={<PayloadsPage/>} />
          <Route path='/cores/page/:page' element={<CoresPage/>}/>
          <Route path='/rockets/page/:page' element = {<RocketsPage/>}/>
          <Route path='/ships/page/:page' element ={<ShipsPage/>} />
          <Route path='/launchpads/page/:page' element={<LaunchpadsPage/>}/>   
        </Routes>
    </>
 )
}

export default App
