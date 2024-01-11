import React, { useState } from 'react'
import MainHeader from './MainHeader';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = props => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <React.Fragment>
            <SideDrawer>
                {/* Drawer menu for mobile view */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 right-0 bg-black p-4 shadow-lg">
                        <NavLinks />
                    </div>
                )}

            </SideDrawer>
            <MainHeader>
                <div className="flex items-center justify-between">
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>
                    <h1>
                        <Link to="/">Your Places</Link>
                    </h1>

                    <nav className="hidden md:flex items-center space-x-4">
                        <NavLinks />
                    </nav>
                </div>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation;