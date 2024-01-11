import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = props => {
    return (
        <ul className='flex'>
            <li>
                <NavLink to="/" exact className="text-white md:text-white sm:text-black mr-4">All Users</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places" className="text-white md:text-white sm:text-black mr-4">My Places</NavLink>
            </li>
            <li>
                <NavLink to="/places/new" className="text-white md:text-white sm:text-black mr-4">Add Place</NavLink>
            </li>
            <li>
                <NavLink to="/auth" className="text-white md:text-white sm:text-black *:mr-4">Login</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks