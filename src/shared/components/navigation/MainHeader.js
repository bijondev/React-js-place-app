import React from 'react'

const MainHeader = props => {
    return (
        <header className="bg-blue-500 p-4">
            {props.children}
        </header>
    )
}
export default MainHeader;