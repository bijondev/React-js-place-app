import React from 'react'
import Card from '../../shared/components/ui/Card'

const PlaceItem = props => {
    return (
        <li className='items-center pb-4' >
            <Card className='flex items-center'>
                <div>
                    <img src={props.image} alt={props.title} />
                </div>
                <div className='flex flex-col items-center mt-3'>
                    <h2 className='text-center text-2xl'>{props.title}</h2>
                    <h3 className='text-center text-1xl'>{props.address}</h3>
                    <p className='text-center'>{props.description}</p>
                </div>
                <div className='flex items-center justify-center mt-3'>
                    <button className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>View On Mape</button>
                    <button className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Edit</button>
                    <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Delete</button>
                </div>
            </Card>
        </li>
    )
}

export default PlaceItem