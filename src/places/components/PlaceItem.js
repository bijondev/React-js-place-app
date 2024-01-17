import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../../shared/components/ui/Card'
import Model from '../../shared/components/ui/Model'
import Map from '../../shared/components/ui/Map'

const PlaceItem = props => {
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <React.Fragment>
            <Model
                show={showMap}
                cancel={closeMapHandler}
                header={props.address}
                footer={<button onClick={closeMapHandler}>Close</button>}
            >
                <div>
                    <Map centerMap={props.coordinates} zoom={16} />
                </div>
            </Model>
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
                        <button className='btn-1' onClick={openMapHandler}>View On Mape</button>
                        <NavLink className="btn-2" to={`/places/${props.id}`}>Edit</NavLink>
                        <NavLink className="btn-3" to="/">Delete</NavLink>
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem