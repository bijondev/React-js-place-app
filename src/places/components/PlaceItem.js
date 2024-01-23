import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../../shared/components/ui/Card'
import Model from '../../shared/components/ui/Model'
import Map from '../../shared/components/ui/Map'
import { authContext } from '../../shared/context/auth-context';

import { useHttpClient } from '../../shared/hooks/http-hook';

import ErrorModel from '../../shared/components/ui/ErrorModel';
import LoadingSpinner from '../../shared/components/ui/LoadingSpinner';

const PlaceItem = props => {
    const auth = useContext(authContext);
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModel, setShowConfirmModel] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const showDeleteWorningHandeler = () => {
        setShowConfirmModel(true);
    }

    const cancelDeleteWorningHandeler = () => {
        setShowConfirmModel(false);
    }

    const confirmDeletehandeler = async () => {
        try {
            await sendRequest(`/places/${props.id}`,
                'DELETE',
                {
                    'Content-Type': 'application/json'
                }
            );
            props.onDelete(props.id);
        }
        catch (error) {
            console.log("authSubmitHandeler : ", error);
        }
    }

    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={clearError} />
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
            <Model
                show={showConfirmModel}
                onCancel={cancelDeleteWorningHandeler}
                header="Are you sure?"
                footer={
                    <React.Fragment>
                        <button className='btn-white' onClick={cancelDeleteWorningHandeler} >Cancel</button>
                        <button className='btn-red' onClick={confirmDeletehandeler}>Delete</button>
                    </React.Fragment>
                }>
                <p>Confirm delete?</p>
            </Model>
            <li className='items-center pb-4' >
                <Card className='flex items-center'>
                    {isLoading && <LoadingSpinner asOverlay />}
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
                        {auth.userId === props.creatorId && (
                            <React.Fragment>
                                <NavLink className="btn-2" to={`/places/${props.id}`}>Edit</NavLink>
                                <button className="btn-3" onClick={showDeleteWorningHandeler}>Delete</button>
                            </React.Fragment>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem