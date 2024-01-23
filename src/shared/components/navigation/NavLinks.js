import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { authContext } from '../../context/auth-context'

const NavLinks = props => {
    const auth = useContext(authContext);


    return (
        <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
                <NavLink to="/" exact className="link">All Users</NavLink>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <NavLink to={`/${auth.userId}/places`} className="link">My Places</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/places/new" className="link">Add Place</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth" className="link">Login</NavLink>
                </li>
            )}

            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout} className="link">Logout</button>
                </li>
            )}
        </ul>
    )
}

export default NavLinks