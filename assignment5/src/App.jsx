import './App.css'
import {Link} from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
import { LaunchesPage } from './components/pages/LaunchesPages';
import { PayloadsPage } from './components/pages/PayloadsPage';
import {CoresPage} from "./components/pages/CoresPage";
import { RocketsPage } from './components/pages/RocketsPage';
import { ShipsPage } from './components/pages/ShipsPage';
import { LaunchpadsPage } from './components/pages/LaunchpadsPage';
import { Launch } from './components/LaunchesIndividual';
import { Payload } from './components/PayloadIndividual';
import { Cores } from './components/CoresIndividual';
import { Rocket } from './components/RocketIndividual';
import { Ship } from './components/ShipsIndividual';
import { LaunchPad } from './components/LaunchpadsIndividual';

function App() {

  return (
    <> 
    <div className='navBar'>
      <Link to='/launches/page/0' className='nav'> Launches</Link>
      <Link to='/payloads/page/0' className='nav'> Payloads</Link>
      <Link to='/cores/page/0' className='nav'> Cores</Link>
      <Link to='/rockets/page/0' className='nav'> Rockets</Link>
      <Link to='/launchpads/page/0' className='nav'> Launch Pads</Link>
      <Link to = '/ships/page/0' className='nav'>Ships</Link>
    </div>
    <Routes>
          <Route path='/launches/page/:page' element={<LaunchesPage/>}/> 
          <Route path='/payloads/page/:page' element ={<PayloadsPage/>} />
          <Route path='/cores/page/:page' element={<CoresPage/>}/>
          <Route path='/rockets/page/:page' element = {<RocketsPage/>}/>
          <Route path='/ships/page/:page' element ={<ShipsPage/>} />
          <Route path='/launchpads/page/:page' element={<LaunchpadsPage/>}/>
          <Route path='/launches/:id' element={<Launch/>}  />
          <Route path='/payloads/:id' element={<Payload/>}/>
          <Route path='/cores/:id' element={<Cores/>} />
          <Route path='/rockets/:id' element={<Rocket/>} />
          <Route path='/ships/:id' element={<Ship/>} />
          <Route path='/launchpads/:id' element={<LaunchPad/>} />
        </Routes>
    </>
 )
}

export default App
