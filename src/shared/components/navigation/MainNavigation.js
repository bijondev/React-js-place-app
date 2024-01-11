import React from 'react'
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const MainNavigation = props => {
    return (
        <MainHeader>
            <button>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1>
                <Link to="/">Your Places</Link>
            </h1>

            <nav>
                <NavLinks />
            </nav>
        </MainHeader>
    )
}

export default MainNavigation;