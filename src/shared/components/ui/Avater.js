import React from 'react'

export const Avater = props => {
    return (
        <div className='w-12'>
            <img src={props.image} alt={props.alt}
                className="rounded-full h-12 w-12" />
        </div>
    )
}
