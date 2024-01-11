import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = props => {
    return (
        <ul>
            <li>
                <NavLink to="/" exact>All Users</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places">My Places</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">Add Place</NavLink>
            </li>
            <li>
                <NavLink to="/auth">Login</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks