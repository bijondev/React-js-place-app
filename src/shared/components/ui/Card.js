import React from 'react'

const Card = props => {
    return (
        <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-yellow-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            {props.children}
        </div>
    )
}
export default Card;