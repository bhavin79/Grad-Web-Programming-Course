import { Route, Link } from "react-router-dom"

export const NavBar = ()=>{
    return (
        <div className="flex justify-around flex-wrap py-2 bg-gray-800 text-gray-50">
            <Link to="/">Home</Link>
            <p><Link to="/artists" className="hover:text-indigo-300">Artists</Link></p>
            <p><Link to="/albums" className="hover:text-blue-300">Albums</Link></p>
            <p><Link to="/companies" className="hover:text-blue-300">Record Companies</Link></p>
            <p><Link to="/search" className="hover:text-blue-300">Search</Link></p>
        </div>
    )
}