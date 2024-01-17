import React from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../../shared/components/ui/Card'
import PlaceItem from './PlaceItem'


const PlacesList = props => {

    if (props.items.length === 0) {
        return (
            <div className='items-center'>
                <Card>
                    <h2>No Place found, maybe create one?</h2>
                    <NavLink className='btn-green' to="/places/new">Share place</NavLink>
                </Card></div>
        )
    }

    return <ul className='flex flex-col items-center'>
        {props.items.map(place => <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
        />)}
    </ul>


}

export default PlacesList